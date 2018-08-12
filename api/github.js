const router = require('express').Router({
  mergeParams: true,
})
const Octokit = require('@octokit/rest')

const { getIdentity, safeAsync } = require('./util')
const config = require('../config')

const octokit = new Octokit({
  timeout: 5000,
  baseUrl: `${config.host}/api/v3`
})
octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN,
})

router.post('/:courseId', safeAsync(async (req, res) => {
  const identity = getIdentity(req)
  if (!identity) {
    res.status(401).send({
      message: 'Could not authorize',
      code: 'no_auth',
    })
    return
  }

  const { netid } = identity;
  
  // Let's try to find this course in the config
  const { courseId } = req.params
  const course = config.courses.find(c => c.id === courseId);

  if (!course) {
    res.status(404).send({
      message: `Course ${courseId} not found`,
      code: 'no_course',
    })
    return
  }

  const respondWithUrl = (status) => {
    res.send({
      status,
      url: `${config.host}/${course.org}/${netid}`,
    })
  }

  // Ensure that the user exists on GitHub
  try {
    await octokit.users.getForUser({
      username: netid,
    })
  } catch (e) {
    if (e.message === 'Not Found') {
      res.status(400).send({
        error: 'User was not found on GitHub',
        code: 'no_github_user',
      })
      // Response: User does not exist on GitHub -- have them log in
      res.render('loginToGHE', {});
    } else {
      console.error(e)
      res.status(500).send({
        error: 'Unknown response from GitHub; please try again laster.',
        code: 'github_err',
      })
    }
    return
  }

  // Create the repository
  try {
    await octokit.repos.createForOrg({
      org: course.org,
      name: netid,
      private: true,
      has_issues: false,
      has_wiki: false,
      description: `${config.semester} repository for ${netid}`,
    })
  } catch (e) {
    if (e.code === 422) {
      // Response: Repo already exists
      respondWithUrl('exists')
    } else {
      console.error(e)
      res.status(500).send({
        error: 'Unknown response from GitHub; please try again laster.',
        code: 'github_err',
      })
    }
    return;
  }

  // Give the student access
  try {
    await octokit.repos.addCollaborator({
      owner: course.org,
      repo: netid,
      username: netid,
      permission: "push"
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({
      error: 'Unknown response from GitHub; please try again laster.',
      code: 'github_err',
    })
    return
  }

  // Lit, we finally have a repo
  respondWithUrl('created')
}))

module.exports = router
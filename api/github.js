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

/**
 * Creates a repo for the authenticated user in the given course.
 * 
 * For a successful creation, the response will contain a "url" field that
 * points to the new repository, as well as a "status" field that will be
 * "exists" if the repository already existed, or "created" if the repository
 * was newly created.
 * 
 * For an error, the response will contain a human-readable "message" and one
 * of the following "code"s:
 * 
 * no_auth: The user was not authenticated (shouldn't be possible with Shib)
 * no_course: The specified course was not found
 * no_github_user: The user does not exist on GitHub
 * github_error: There was an unspecified GitHub error
 */
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

  const unknownGithubError = (err) => {
    console.error(err)
    res.status(500).send({
      error: 'Unknown response from GitHub; please try again laster.',
      code: 'github_error',
    })
  }

  // Ensure that the user exists on GitHub
  try {
    await octokit.users.getForUser({
      username: netid,
    })
  } catch (e) {
    if (e.code === 404) {
      // Response: User does not exist on GitHub -- have them log in
      res.status(404).send({
        error: 'User was not found on GitHub',
        code: 'no_github_user',
      })
    } else {
      unknownGithubError(e)
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
      unknownGithubError(e)
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
    unknownGithubError(e)
    return
  }

  // Lit, we finally have a repo
  respondWithUrl('created')
}))

module.exports = router
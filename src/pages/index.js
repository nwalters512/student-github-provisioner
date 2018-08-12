import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import SelectCourse from '../components/select-course'
import ConfirmCourse from '../components/confirm-course'
import CreatingRepo from '../components/creating-repo'
import RepoCreated from '../components/repo-created'
import ErrorPage from '../components/error'

import { whoami, createRepo } from '../client-data'

const styles = _theme => ({
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '30px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
})

// State machines? In my app? It's more likely than you think!
const transitionMatrix = {
  loadingIdentity: {
    success: 'selectCourse',
    error: 'error',
  },
  selectCourse: {
    select: 'confirmCourse',
  },
  confirmCourse: {
    confirm: 'creatingRepo',
    cancel: 'selectCourse',
  },
  creatingRepo: {
    success: 'repoCreated',
    error: 'error',
  },
  repoCreated: {},
  error: {
    retry: 'loadingIdentity',
  },
}

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'loadingIdentity',
      courseId: null,
    }
  }

  componentDidMount() {
    this.loadIdentity()
  }

  transition(action, extraState = {}) {
    const { page } = this.state
    const nextPage = transitionMatrix[page][action]
    if (nextPage) {
      this.setState({ page: nextPage, ...extraState })
    } else {
      throw new Error(`Cannot transition from ${page} with action ${action}`)
    }
  }

  confirmCourse() {
    this.transition('confirm')

    const { courseId } = this.state
    createRepo(courseId)
      .then(data => {
        this.transition('success', {
          repoStatus: data.status,
          repoUrl: data.url,
        })
      })
      .catch(err => {
        console.error(err)
        this.transition('error')
      })
  }

  loadIdentity() {
    whoami()
      .then(data => {
        this.transition('success', data)
      })
      .catch(err => {
        console.error(err)
        this.transition('error')
      })
  }

  retry() {
    this.transition('retry')
    this.loadIdentity()
  }

  render() {
    const { page, netid, courseId, repoStatus, repoUrl } = this.state
    const { classes } = this.props

    let content
    switch (page) {
      case 'selectCourse':
        content = (
          <SelectCourse
            onCourseSelected={id => this.transition('select', { courseId: id })}
          />
        )
        break
      case 'confirmCourse':
        content = (
          <ConfirmCourse
            netid={netid}
            courseId={courseId}
            onConfirmed={() => this.confirmCourse()}
            onCanceled={() => this.transition('cancel', { courseId: null })}
          />
        )
        break
      case 'creatingRepo':
        content = <CreatingRepo />
        break
      case 'repoCreated':
        content = <RepoCreated repoStatus={repoStatus} repoUrl={repoUrl} />
        break
      case 'error':
        content = <ErrorPage onRetry={() => this.retry()} />
        break
      default:
        content = null
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              GitHub Repo Provisioner
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.container}>{content}</div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Index)

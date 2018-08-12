import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import SelectCourse from '../components/select-course'
import ConfirmCourse from '../components/confirm-course'
import CreatingRepo from '../components/creating-repo'
import RepoCreated from '../components/repo-created'

import { whoami, createRepo } from '../client-data'

const styles = _theme => ({
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '30px',
    paddingLeft: '20px',
    paddingRight: '20px'
  }
})

// State machines? In my app? It's more likely than you think!
const transitionMatrix = {
  'loadingIdentity': {
    'success': 'selectCourse',
    'error': null,
  },
  'selectCourse': {
    'select': 'confirmCourse',
  },
  'confirmCourse': {
    'confirm': 'creatingRepo',
    'cancel': 'selectCourse',
  },
  'creatingRepo': {
    'success': 'repoCreated',
    'error': null,
  },
  'repoCreated': {},
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
    whoami().then(data => {
      this.transition('success', data)
    }).catch((err) => {
      console.error(err)
      this.transition('error')
    })
  }

  transition(action, extraState = {}) {
    const { page } = this.state;
    console.log(`Transitioning from ${page} with action ${action}`)
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
    createRepo(courseId).then(data => {
      this.transition('success', {
        repoStatus: data.status,
        repoUrl: data.url,
      })
    }).catch(err => {
      console.error(err)
      this.transition('error')
    })
  }

  render() {
    const {
      page,
      netid,
      courseId,
      repoStatus,
      repoUrl,
    } = this.state;
    const { classes } = this.props;

    let content;
    switch (page) {
      case 'selectCourse':
        content = (
          <SelectCourse
            onCourseSelected={(id) => this.transition('select', { courseId: id })}
          />
        )
        break;
      case 'confirmCourse':
        content = (
          <ConfirmCourse
            netid={netid}
            courseId={courseId}
            onConfirmed={() => this.confirmCourse()}
            onCanceled={() => this.transition('cancel', { courseId: null })}
          />
        )
        break;
      case 'creatingRepo':
        content = (
          <CreatingRepo />
        )
        break;
      case 'repoCreated':
        content = (
          <RepoCreated repoStatus={repoStatus} repoUrl={repoUrl} />
        )
        break;
      default:
        content = null;
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
        <div className={classes.container}>
          {content}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Index);
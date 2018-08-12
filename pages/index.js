import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import SelectCourse from '../components/select-course'
import ConfirmCourse from '../components/confirm-course'
import CreatingRepo from '../components/creating-repo'

import { whoami } from '../client-data'

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

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      page: 0,
      courseId: null,
    }
  }

  componentDidMount() {
    whoami().then(data => {
      this.setState({
        loading: false,
        ...data,
      })
    }).catch(() => {
      this.setState({
        loading: false,
      })
    })
  }

  onCourseSelected(courseId) {
    this.setState({
      page: 1,
      courseId,
    })
  }

  onCourseConfirmed() {
    this.setState({
      page: 2,
      courseId: null,
    })
  }

  onCourseCanceled() {
    this.setState({
      page: 0,
      courseId: null,
    })
  }

  render() {
    const {
      loading,
      page,
      netid,
      courseId,
    } = this.state;
    const { classes } = this.props;

    let content;
    if (loading) {
      content = null
    } else {
      switch (page) {
        case 0:
          content = (
            <SelectCourse
              onCourseSelected={(id) => this.onCourseSelected(id)}
            />
          )
          break;
        case 1:
          content = (
            <ConfirmCourse
              netid={netid}
              courseId={courseId}
              onConfirmed={() => this.onCourseConfirmed()}
              onCanceled={() => this.onCourseCanceled()}
            />
          )
          break;
        case 2:
          content = (
            <CreatingRepo />
          )
          break;
        default:
         content = null;
      }
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
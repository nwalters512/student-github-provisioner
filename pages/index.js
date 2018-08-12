import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import SelectCourse from '../components/select-course'
import ConfirmCourse from '../components/confirm-course'
import CreatingRepo from '../components/creating-repo'

const styles = theme => ({
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
  static async getInitialProps({ req }) {
    let netid = null;
    if (req) {
      if (process.env.NODE_ENV !== 'production') {
        netid = 'dev';
      } else {
        netid = req['eppn'].split('@')[0]
      }
    }
    return { netid }
  }

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      courseId: null,
    }
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
    let content;
    switch (this.state.page) {
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
            netid={this.props.netid}
            courseId={this.state.courseId}
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
    }
    
    const { classes } = this.props;
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
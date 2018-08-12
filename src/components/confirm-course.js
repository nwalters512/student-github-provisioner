import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import config from '../config'

const styles = theme => ({
  buttonContainer: {
    display: 'flex',
    marginTop: 4 * theme.spacing.unit,
  },
  backButton: {
    marginRight: 'auto',
  },
})

const ConfirmCourse = ({
  onConfirmed,
  onCanceled,
  courseId,
  netid,
  classes,
}) => {
  const course = config.courses.find(c => c.id === courseId)
  return (
    <Card>
      <CardContent>
        <Typography variant="headline" gutterBottom>
          Let&apos;s confirm that
        </Typography>
        <Typography>
          This will create a repo for <strong>{netid}</strong> in the course{' '}
          <strong>{course.shortname}</strong>.
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            className={classes.backButton}
            onClick={onCanceled}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirmed}>
            Create repo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

ConfirmCourse.propTypes = {
  courseId: PropTypes.string.isRequired,
  netid: PropTypes.string.isRequired,
  onConfirmed: PropTypes.func.isRequired,
  onCanceled: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConfirmCourse)

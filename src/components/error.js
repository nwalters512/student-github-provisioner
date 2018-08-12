import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ErrorIcon from '@material-ui/icons/Error'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: 4 * theme.spacing.unit,
  },
  icon: {
    position: 'relative',
    top: '0.125em',
    marginRight: theme.spacing.unit,
  },
  button: {
    marginLeft: 'auto',
  },
})

const ErrorPage = ({ classes, onRetry }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="headline" gutterBottom>
          <ErrorIcon className={classes.icon} color="error" />
          Womp womp
        </Typography>
        <Typography>
          Something went wrong. Retry in a bit, and contact course staff if the
          problem persists.
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => onRetry()}
          >
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

ErrorPage.propTypes = {
  onRetry: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ErrorPage)

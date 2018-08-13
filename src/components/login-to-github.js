import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ErrorIcon from '@material-ui/icons/Error'
import { withStyles } from '@material-ui/core/styles'

import config from '../config'

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

const LoginToGithub = ({ classes, onLogin }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="headline" gutterBottom>
          <ErrorIcon className={classes.icon} color="error" />
          GitHub account not found
        </Typography>
        <Typography>
          Your identity on GitHub isn&apos;t created until the first time you
          log in. To continue, please log in to the CS@Illinois GitHub instance.
          After logging in, come back to this tab to try again!
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            href={config.host}
            target="_blank"
            onClick={() => onLogin()}
          >
            Login to GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

LoginToGithub.propTypes = {
  onLogin: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginToGithub)

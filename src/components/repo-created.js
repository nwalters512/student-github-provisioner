import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon'
import { withStyles } from '@material-ui/core/styles'

const GithubIcon = props => (
  <SvgIcon {...props}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
  </SvgIcon>
)

const styles = theme => ({
  buttonContainer: {
    display: 'flex',
    marginTop: 4 * theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  githubButton: {
    marginTop: 5 * theme.spacing.unit,
    marginLeft: 'auto',
  },
  createAnotherButton: {
    marginTop: 2 * theme.spacing.unit,
  },
})

const RepoCreated = ({ classes, repoUrl, createAnotherRepo }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="headline" gutterBottom>
          You&apos;re all set!
        </Typography>
        <Typography>
          You can find your repo at <a href={repoUrl}>{repoUrl}</a>.
        </Typography>
        <Button
          variant="extendedFab"
          color="primary"
          href={repoUrl}
          target="_blank"
          fullWidth
          className={classes.githubButton}
        >
          <GithubIcon className={classes.extendedIcon} />
          Go to repo
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => createAnotherRepo()}
          className={classes.createAnotherButton}
        >
          Create another repo
        </Button>
      </CardContent>
    </Card>
  )
}

RepoCreated.propTypes = {
  repoUrl: PropTypes.string.isRequired,
  createAnotherRepo: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RepoCreated)

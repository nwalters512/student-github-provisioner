import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {
    marginTop: 4 * theme.spacing.unit,
  }
})

const CreatingRepo = ({
  classes
}) => {
  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Typography>
          We'll have your repo ready soon!
        </Typography>
        <CircularProgress className={classes.progress} />
      </CardContent>
    </Card>
  )
}

CreatingRepo.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreatingRepo);

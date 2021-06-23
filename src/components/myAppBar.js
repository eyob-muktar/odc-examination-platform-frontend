import React from 'react'
//MUI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { AppBar } from 'react-admin'

const useStyles = makeStyles({
  toolbar: {
    boxShadow: 0,
    color: '#ff7900'
  },
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
})

const MyAppBar = props => {
  const classes = useStyles()
  return (
    <AppBar color='default' {...props} classes={classes}>
      <Typography
        color='inherit'
        variant='h5'
        className={classes.title}
      >
        Test Dome
      </Typography>
      <span />
    </AppBar>
  )
}

export default MyAppBar
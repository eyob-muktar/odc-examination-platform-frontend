import React from 'react'
import { Sidebar } from 'react-admin'
// MUI
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  drawerPaper: {
    borderRight: '4px solid #fff',
    background: '#fff'
  },
})

const MySidebar = props => {
  const classes = useStyles()
  return (
    <Sidebar closedSize={50} classes={classes} {...props} />
  )
}

export default MySidebar

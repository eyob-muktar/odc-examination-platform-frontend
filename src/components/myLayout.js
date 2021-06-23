/* eslint-disable no-unused-vars */
import React from 'react'

import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
// eslint-disable-next-line no-unused-vars
import { ThemeProvider } from '@material-ui/styles'
import {
  AppBar,
  Menu,
  Notification,
  setSidebarVisibility,
  ComponentPropType,
  defaultTheme,
} from 'react-admin'
import MyAppBar from './myAppBar'
import MySidebar from './mySidebar'
import MyMenu from './myMenu'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    minHeight: '100vh',
    position: 'relative',
  },
  appFrame: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
  },
  header: {
    left: '240px'
  },
  contentWithSidebar: {
    display: 'flex',
    flexGrow: 1,
    height: '100vh',
  },
  sidebar: {
    border: '1px solid #fff',
    boxShadow: '0 1rem 1rem 0 rgba(0, 0, 0, 0.2)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    padding: theme.spacing(3),
    marginTop: '48px',
    paddingLeft: 5,
  },
}))

const MyLayout = ({
  children,
  dashboard,
  title,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const open = useSelector(state => state.admin.ui.sidebarOpen)

  useEffect(() => {
    dispatch(setSidebarVisibility(true))
  }, [setSidebarVisibility])

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <MyAppBar className={classes.header} title={title} open={open}  />
        <main className={classes.contentWithSidebar}>
          <MySidebar className={classes.sidebar}>
            <MyMenu  hasDashboard={!!dashboard} />
          </MySidebar>
          <div className={classes.content}>
            {children}
          </div>
        </main>
        {/* <Notification /> */}
      </div>
    </div>
  )
}

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  dashboard: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  title: PropTypes.string.isRequired,
}

// const MyLayout = ({ children }) => {
//   return (
//     <div>
//       <MyAppBar />
//       {children}
//     </div>
//   )
  
// }

// MyLayout.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

// }
export default MyLayout
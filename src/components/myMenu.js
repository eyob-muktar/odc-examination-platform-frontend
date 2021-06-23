import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@material-ui/core'
import { MenuItemLink, getResources, DashboardMenuItem } from 'react-admin'
//MUI
import { makeStyles } from '@material-ui/core/styles'
//icons
import DefaultIcon from '@material-ui/icons/ViewList'
import LabelIcon from '@material-ui/icons/Label'
// import DashboardIcon from '@material-ui/icons/Dashboard'

const useStyles = makeStyles({
  root: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: '.5em'
  },
  menuContainer: {
    marginTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& .RaMenuItemLink-root-43': {
      color: '#ff7900',
      fontSize: '1.1em',
      letterSpacing: '.15rem',
    },
    '& .RaMenuItemLink-active-44': {
      borderLeft: '4px solid #ff7900',
      '& .MuiListItemIcon-root': {
        color: '#ff7900'
      }
    },
    '& .MuiListItemIcon-root': {
      color: '#0c6394'
    },
    '& .MuiListItem-gutters': {
      padding: '10px'
    }
  },
  menu: {
    marginTop: '1em',
    fontSize: '1.1em',
    letterSpacing: '.15rem',
    position: 'relative'
  },

})


const myMenu = ({ onMenuClick, logout }) => {
  const classes = useStyles()
  const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const open = useSelector(state => state.admin.ui.sidebarOpen)
  const resources = useSelector(getResources)
  return (
    <div className={classes.root}>
      <div className={classes.menuContainer}>
        <DashboardMenuItem
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
        {resources.map((resource, index) => (
          <>

            <MenuItemLink
              key={index}
              to={`/${resource.name}`}
              primaryText={
                (resource.options && resource.options.label) || resource.name
              }
              leftIcon={
                resource.icon ? <resource.icon /> : <DefaultIcon />
              }
              onClick={onMenuClick}
              sidebarIsOpen={open}
              className={classes.menu}
            />

          </>
        ))
        }
        <MenuItemLink
          to="/me"
          primaryText="Profile"
          leftIcon={<LabelIcon />}
          onClick={onMenuClick}
          key='profiles'
          sidebarIsOpen={open}
          className={classes.menu}
        />
      </div>

      {isXSmall && logout}
    </div>
  )
}

export default myMenu

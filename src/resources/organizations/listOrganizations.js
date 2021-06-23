/* eslint-disable react/display-name */
import React from 'react'
import { useQueryWithStore } from 'ra-core'
import { Error } from 'ra-ui-materialui'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import CompanyIcon from '@material-ui/icons/Business'
import MailIcon from '@material-ui/icons/Mail'
import PersonIcon from '@material-ui/icons/Group'
import DescIcon from '@material-ui/icons/Description'

import DataDisplay from '../../components/dataDisplay'
import CreateOrganizations from './createOrganization'

const useStyles = makeStyles({
  gridIcon: {
    marginRight: '.5em',
    color: '#555'
  }
})

const createData = (id, name, description, adminName, adminEmail) => {
  return { id, name, description, adminName, adminEmail }
}


const listOrganizations = () => {
  const classes = useStyles()
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <>
          <CompanyIcon className={classes.gridIcon} />
          { params.value}
        </>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: (params) => (
        <>
          <DescIcon className={classes.gridIcon} />
          { params.value}
        </>
      )
    },
    {
      field: 'adminName',
      headerName: 'Admin Name',
      flex: 1,
      renderCell: (params) => (
        <>
          <PersonIcon className={classes.gridIcon} />
          { params.value}
        </>
      )
    },
    {
      field: 'adminEmail',
      headerName: 'Admin Email',
      flex: 1,
      renderCell: (params) => (
        <>
          <MailIcon className={classes.gridIcon} />
          { params.value}
        </>
      )
    },
  ]
  const { error, data } = useQueryWithStore({
    type: 'getList',
    resource: 'organizations',
    payload: {}
  })
  if (error) { return error.body ? <Error error={error.body.error} /> : <Error error={'Network Problem! Please Try Again'} /> }

  const rows = data ? data.map((orgn) => {
    return createData(orgn._id, orgn.name, orgn.description, orgn.admin.name, orgn.admin.email)
  }) : [{ id: '1', name: 'mine', description: 'mmmsdf', adminName: 'kjsdfdsf', adminEmail: 'nshdfjkdsf@jksdf.com' }]
  return (
    <>
      <DataDisplay
        columns={columns}
        rows={rows}
        CreateButton={CreateOrganizations}
        resource='organizations'
      />
    </>
  )
}

export default listOrganizations
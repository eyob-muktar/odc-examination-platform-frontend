/* eslint-disable react/display-name */
import React from 'react'
import { useQueryWithStore } from 'ra-core'
// import { Error } from 'ra-ui-materialui'
//MUI
import { makeStyles } from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/People'
import MailIcon from '@material-ui/icons/Mail'

import CreateExaminers from './createExaminers'
import DataDisplay from '../../components/dataDisplay'
import Skeleton from '@material-ui/lab/Skeleton'
import { Error } from 'ra-ui-materialui'

const useStyles = makeStyles({
  gridIcon: {
    marginRight: '.5em',
    color: '#555'
  }
})

const createData = (id, name, email) => {
  return { id, name, email }
}

const ListExaminers = () => {
  const classes = useStyles()
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: classes.tableHeader,
      renderCell: (params) => (
        <>
          <GroupIcon className={classes.gridIcon} />
          { params.value}
        </>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClassName: classes.tableHeader,
      flex: 1,
      renderCell: (params) => (
        <>
          <MailIcon className={classes.gridIcon} />
          { params.value}
        </>
      )
    },
  ]

  const ExamSkeleton = (index) => {
    return (
      createData(index, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />)
    )
  }

  const orgId = localStorage.getItem('org-id')
  const { error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'organizations',
    payload: { id: orgId }
  })

  if (error) { return error.body ? <Error error={error.body.error} /> : <Error error={'Network Problem! Please Try Again'} /> }

  const rows = data ? data.examiners.map((examiner) => {
    return createData(examiner._id, examiner.name, examiner.email)
  }) : Array.from({ length: 7 }, (_, index) => ExamSkeleton(index))
  return (
    <>
      <DataDisplay
        columns={columns}
        rows={rows}
        CreateButton={CreateExaminers}
        resource='users'
      />
    </>
  )
}

export default ListExaminers

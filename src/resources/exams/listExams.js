/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { useNotify, useQueryWithStore } from 'ra-core'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import TitleIcon from '@material-ui/icons/Title'
import DescIcon from '@material-ui/icons/Description'
import TimeIcon from '@material-ui/icons/Timelapse'
import Skeleton from '@material-ui/lab/Skeleton'

import DataDisplay from '../../components/dataDisplay'
import InviteExaminees from './inviteExaminees'
import EditExams from './editExams'
import { Error } from 'ra-ui-materialui'

const useStyles = makeStyles({
  gridIcon: {
    marginRight: '.5em',
    color: '#808080',
  },
  gridAvatar: {
    background: '#ff7900',

  }
})


const CreateExamButton = () => {
  return (
    <Button component={Link} style={{ color: '#fff' }} to='/create-exam' startIcon={<AddIcon />} variant="contained" color="primary"> Create </Button>
  )
}

const createData = (id, title, description, duration, edit) => {
  return { id, title, description, duration, edit }
}

const ExamSkeleton = (index) => {
  return (
    createData(index, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />)
  )
}

const ListExams = () => {
  const classes = useStyles()
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      // eslint-disable-next-line react/display-name
      renderCell: (params) => (
        <>
          <TitleIcon className={classes.gridIcon} />
          {params.value}
        </>
      )
      ,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: (params) => (
        <>
          <DescIcon className={classes.gridIcon} />
          {params.value}
        </>
      )
      ,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      renderCell: (params) => (
        <>
          <TimeIcon className={classes.gridIcon} />
          {params.value}
        </>
      )
      ,
    },
    {
      field: 'topics',
      headerName: 'Topics',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            disabled={!loaded}
            component={Link}
            to={`/invitations/${params.id}`}
            variant='contained'
          >
            Examinees
          </Button>
        </>
      )
      ,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            disabled={!loaded}
            component={Link}
            to={`/${params.id}/edit-questions`}
            variant='contained'
          >
            Edit
          </Button>
          {/* <EditExams
            loaded={loaded}
            title={params.value?.title}
            id={params.value?.id}
            description={params.value?.description}
            timeAllowed={params.value?.timeAllowed}
          /> */}
        </>
      )
      ,
    }
  ]
  const orgId = localStorage.getItem('org-id')
  const notify = useNotify()
  const { loaded, error, data } = useQueryWithStore({
    type: 'getList',
    resource: `exams/by-organization/${orgId}`,
    payload: {}
  })
  // if (error) { return error.body ? <Error error={error.body.error} /> : <Error error={'Network Problem! Please Try Again'} /> }

  const rows = data ? data.map((exam) => {
    return createData(exam._id, exam.title, exam.description, `${exam.timeAllowed} Minutes`, { id: exam._id, title: exam.title, description: exam.description, timeAllowed: exam.timeAllowed })
  }) : Array.from({ length: 7 }, (_, index) => ExamSkeleton(index))


  return (
    <>
      <DataDisplay
        resource='exams'
        columns={columns}
        rows={rows}
        CreateButton={CreateExamButton}
        InviteButton={InviteExaminees}
      />
    </>
  )
}

export default ListExams

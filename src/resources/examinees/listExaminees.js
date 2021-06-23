/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQueryWithStore } from 'ra-core'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// import { Error } from 'ra-ui-materialui'
//MUI
import { makeStyles } from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/People'
// import { ReactComponent as Mail } from '../../mail.svg'
import MailIcon from '@material-ui/icons/Mail'
import {
  Chip, Paper,

} from '@material-ui/core'

import CancelInvitation from './cancelInvitation'
import DataDisplay from '../../components/dataDisplay'
import Skeleton from '@material-ui/lab/Skeleton'
import InviteExaminees from '../exams/inviteExaminees'
import { Error } from 'ra-ui-materialui'


const useStyles = makeStyles({
  gridIcon: {
    marginRight: '.5em',
    color: '#808080'
  },
  root: {
    '& a': {
      textDecoration: 'none',
      fontSize: '1.2rem',
      color: '#808080'
    }
  }

})

const createData = (id, name, email, result, actions) => {
  return { id, name, email, result, actions }
}

const ListExaminees = () => {
  const { id } = useParams()
  const classes = useStyles()
  const tableData = [
    {
      name: 'January',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'February',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'March',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'April',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'June',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'July',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: classes.tableHeader,
      renderCell: (params) => (
        <>
          <GroupIcon className={classes.gridIcon} />
          {params.value}
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
          {params.value}
        </>
      )
    },
    {
      field: 'result',
      headerName: 'Result',
      renderCell: (params) => (
        <>
          {params.value.time ? <Link to={`/results/${params.id}`}>{params.value.result}</Link> : <Chip label='pending' color='secondary' />}
        </>
      ),
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <CancelInvitation finished={params.value?.finished !== undefined} id={params.value?.exam} examinees={params.value?.email} />
        </>
      ),
      flex: 1,
    },

  ]

  const ExamSkeleton = (index) => {
    return (
      createData(index, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />, <Skeleton animation='wave' style={{ height: 65, width: '100%' }} />)
    )
  }

  const { error, loaded, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'exams',
    payload: { id: `${id}/invitations` }
  })

  // if (error) { return error.body ? <Error error={error.body.error} /> : <Error error={'Network Problem! Please Try Again'} /> }

  const rows = data ? data.map((invitation) => {
    console.log(invitation)
    return createData(invitation._id, invitation.examineeName, invitation.examineeEmail, { result: invitation.totalPointsGained, time: invitation.finishedAt }, { exam: invitation.exam, email: invitation.examineeEmail, finished: invitation.finishedAt })
  }) : Array.from({ length: 7 }, (_, index) => ExamSkeleton(index))
  return (
    <div className={classes.root}>
      <DataDisplay
        columns={columns}
        rows={rows}
        CreateButton={InviteExaminees}
        resource={'invitations'}
      />
      <Paper className={classes.summary}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={tableData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={10}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="pv" fill='#0c6394' background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  )
}

export default ListExaminees

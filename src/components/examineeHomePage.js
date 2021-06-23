/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useQueryWithStore, Loading, Error, useCreate, useRedirect, useNotify, Notification } from 'react-admin'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import MailIcon from '@material-ui/icons/MailOutline'
import KeyIcon from '@material-ui/icons/Keyboard'
import PointIcon from '@material-ui/icons/Assessment'

const useStyles = makeStyles({
  root: {
    padding: '0 3em',
    background: 'url(/images/proceed-bg.png)',
    '& .MuiFilledInput-underline:before': {
      borderBottom: '1px solid #fff'
    },
    '& .MuiFormLabel-root': {
      color: '#fff'
    },
    '& .MuiInputBase-root': {
      color: '#fff'
    },
    '& .MuiCheckbox-root': {
      color: '#fff'
    },
    height: '100vh',
    backgroundSize: 'cover',
    color: '#fff'

  },
  logo: {
    color: '#ff7900',
    marginBottom: '3em'
  },
  nameField: {
    width: '100%',
    marginBottom: '3em',
  },
  emailField: {
    width: '100%',
    marginBottom: '1em',
    color: '#fff'
  },
  btn: {
    background: '#ff7900',
    color: '#fff',
    marginRight: '1em'
  },
  btnContainer: {
    float: 'left',
    marginTop: '2em'
  },
  rightPane: {
    textAlign: 'end',
    marginLeft: 'auto',
    width: '40%',
    padding: '3em'
  },
  examTitle: {
    color: '#fff',
    marginBottom: '4em',
  },

  progress: {
    position: 'absolute'
  }
})

const ExamineeHomePage = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    accessKey: '',
    examineeEmail: ''
  })
  const dispatch = useDispatch()
  const notify = useNotify()
  const redirect = useRedirect()

  const handleStart = () => {
    setLoading(true)
    axios.post('http://odc-ep.herokuapp.com/api/exams/60c07015015309001569c586/start', {
      examineeEmail: form.examineeEmail,
      accessKey: form.accessKey
    })
      .then((response) => {
        dispatch({
          type: 'SET_EXAM_QUESTIONS',
          payload: response.data.data
        })
        setLoading(false)
        localStorage.setItem('examineeEmail', form.examineeEmail)
        localStorage.setItem('accessKey', form.accessKey)
        redirect('/take-exams')

      }).catch(err => {
        err.response ? notify('jkkjsdf', 'warning') : notify('Something went wrong! try again', 'warning')
        setLoading(false)
        console.log(err)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleStart()
  }
  const { loaded, error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'exams',
    payload: { id: '60c07015015309001569c586' }
  })
  if (!loaded) { return <Loading /> }
  if (error) { return error.body ? <Error error={error.body.error} /> : <Error error={'Network Problem! Please Try Again'} /> }

  const handleChange = ({ currentTarget: { name, value } }) => {
    setForm((state) => ({ ...state, [name]: value }))
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.rightPane}>
        <Typography variant='h5' className={classes.examTitle}>
          {data.title}
        </Typography>
        {/* <Typography variant='subtitle1' className={classes.examTitle}>
          {data.description}
        </Typography> */}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name='examineeEmail'
            value={form.examineeEmail}
            label="Email Address"
            variant='filled'
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
            required
            fullWidth
            onChange={handleChange}
            className={classes.emailField}
          />
          <TextField
            margin="dense"
            name='accessKey'
            value={form.accessKey}
            variant='filled'
            label="Access Code"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            required
            onChange={handleChange}
            className={classes.nameField}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="I understand that once I begin this assessment I cannot leave 
            and return to this assessment at a later time. "
          />
          <br />
          <div className={classes.btnContainer}>
            <Button
              variant='contained'
              className={classes.btn}
              type='submit'
              disabled={loading}
            >
              Begin Exam
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
            <Typography variant='overline' className={classes.timeInfo}>
              Time Limit: {data.timeAllowed} Minutes
            </Typography>
          </div>
        </form>
      </div>
      <Notification />
    </Paper>
  )
}

ExamineeHomePage.propTypes = {
  question: PropTypes.string,
  choices: PropTypes.array,
  point: PropTypes.number
}

export default ExamineeHomePage

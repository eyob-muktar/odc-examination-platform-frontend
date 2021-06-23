import React, { useState } from 'react'
//MUI
import { Avatar, Button, CircularProgress, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useCreate, useNotify, useRedirect, Notification } from 'react-admin'

const useStyles = makeStyles({
  root: {
    height: '1px',
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#eee',
    justifyContent: 'flex-start',
  },
  forgotPaper: {
    borderRadius: '15px',
    maxWidth: '500px',
    marginTop: '6em',
    padding: '2em',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bolder'
  },
  mainText: {
    margin: '2em 0'
  },
  secondaryText: {
    margin: '2em 0',
    color: '#777'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  resetAvatar: {
    width: '100px',
    height: '100px',
    margin: '1em',
    '& img': {
      objectFit: 'contain'
    },
  },
  textField: {
    width: '60%',
    margin: '0 20% 2em 20%',
    display: 'block',
  },
  button: {
    width: '60%',
    margin: '0 20%',
    borderRadius: '20px',
    background: '#ff7900',
    color: '#fff'
  },
  progress: {
    position: 'absolute',
  }
})



const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const classes = useStyles()
  const notify = useNotify()
  const redirect = useRedirect()

  const [create, { loading }] = useCreate(
    'auth/request-password-reset',
    { email },
    {
      onSuccess: () => {
        localStorage.setItem('forgottenEmail', email)
        notify('Verification Email Sent', 'info')
        redirect('/reset-password')
      },
      onFailure: () => {
        notify('Something went wrong! try again', 'warning')
      }
    }
  )
  console.log(email)
  return (
    <div className={classes.root}>
      <Paper className={classes.forgotPaper}>
        <Typography variant='subtitle1' className={classes.title} >
          Forgot Password?
        </Typography>
        <div className={classes.avatarContainer}>
          <Avatar variant='square' src='/images/sad.svg' className={classes.resetAvatar} />
        </div>
        <Typography variant='body1' className={classes.mainText}>
          Enter your email and get a code to reset your password
        </Typography>
        <Typography variant='body2' className={classes.secondaryText}>
          We will email you a verification code to reset your password
        </Typography>
        <TextField
          name='email'
          id='email'
          value={email}
          type='email'
          onChange={e => setEmail(e.target.value)}
          className={classes.textField}
          placeholder='Email Address'
          fullWidth
        />
        <Button
          variant='contained'
          className={classes.button}
          fullWidth
          onClick={create}
        >
          Send
          {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}
        </Button>
      </Paper>
      <Notification />
    </div>
  )
}

export default ForgotPassword

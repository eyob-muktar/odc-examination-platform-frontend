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
  changePaper: {
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
  changeAvatar: {
    width: '100px',
    height: '100px',
    margin: '1em',
    '& img': {
      objectFit: 'contain'
    },
  },
  textField: {
    '& . MuiInput-underline:after': {
      borderBottomColor: '#ff7900',
    },
    width: '60%',
    margin: '0 20% 2em 20%',
    display: 'block',
    color: '#ddffd2'
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



const ChangePassword = () => {
  const email = localStorage.getItem('forgottenEmail')
  const secretCode = localStorage.getItem('secretCode')
  const [newPassword, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const classes = useStyles()
  const notify = useNotify()
  const redirect = useRedirect()
  const [create, { loading }] = useCreate(
    'auth/reset-password',
    { secretCode, email, newPassword },
    {
      onSuccess: () => {
        notify('Password changed successfully', 'info')
        redirect('/login')
        localStorage.removeItem('forgottenEmail')
        localStorage.removeItem('secretCode')
      },
      onFailure: () => {
        notify('Something went wrong! try again', 'warning')
      }
    }
  )

  return (
    <div className={classes.root}>
      <Paper className={classes.changePaper}>
        <Typography variant='subtitle1' className={classes.title} >
          New Password
        </Typography>
        <div className={classes.avatarContainer}>
          <Avatar src='/images/verified.svg' variant='square' className={classes.changeAvatar} />
        </div>
        <Typography variant='body1' className={classes.mainText}>
          A strong password i a combination of letters, numbers and punctuation marks
        </Typography>
        <TextField
          name='newPassword'
          value={newPassword}
          type='password'
          onChange={e => setPassword(e.target.value)}
          className={classes.textField}
          placeholder='Password'
          fullWidth
        />
        <TextField
          name='confirmPassword'
          value={confirmPassword}
          type='password'
          onChange={e => setConfirmPassword(e.target.value)}
          className={classes.textField}
          placeholder='Confirm Password'
          fullWidth
        />

        <Button
          variant='contained'
          className={classes.button}
          fullWidth
          onClick={create}
        >
          Reset
          {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}
        </Button>
      </Paper>
      <Notification />
    </div>
  )
}

export default ChangePassword

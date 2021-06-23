import React, { useState } from 'react'

//MUI
import { Avatar, Button, CircularProgress, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useCreate, useNotify, Notification, useRedirect } from 'react-admin'

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
  resetPaper: {
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
    '& img' : {
      objectFit: 'contain'
    },
  },
  
  fieldContainer: {
    display: 'flex',
    width: '60%',
    margin: '0 20%',
    justifyContent: 'space-between'
  },
  textField: {
    width: '15%',
    display: 'block',
    textAlign: 'center'
  },
  resendButton: {
    fontWeight: 'bolder',
    color: '#ff7900'
  },
  button: {
    width: '60%',
    margin: '0 20%',
    borderRadius: '20px',
    background: '#ff7900',
    color: '#fff',
  },
  progress: {
    position: 'absolute',
  }

})
const createCode = (code1, code2, code3, code4, code5, code6) => {
  return code1 + code2 + code3 + code4 + code5 + code6
}

const ResetPassword = () => {
  const email = localStorage.getItem('forgottenEmail')
  const [code, setCode] = useState({
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: ''
  })
  const secretCode = createCode(code.code1, code.code2, code.code3, code.code4, code.code5, code.code6 )
  const classes = useStyles()
  const notify = useNotify()
  const redirect = useRedirect()
  const [create, { loading }] = useCreate(
    'auth/validate-password-reset-secret-code',
    {email, secretCode},
    {
      onSuccess: () => {
        localStorage.setItem('secretCode', secretCode)
        redirect('/change-password')
      },
      onFailure: (error) => {
        console.log(error)
        error.data ? notify(error.data.error) : notify('Something went wrong! try again', 'warning')
      }
    }
  )

  

  const handleChange = ({ currentTarget: { name, value } }) => {
    setCode((state) => ({ ...state, [name]: value }))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.resetPaper}>
        <Typography variant='subtitle1' className={classes.title} >
          Verification
        </Typography>
        <div className={classes.avatarContainer}>
          <Avatar variant='square' src='/images/Happy.svg' className={classes.resetAvatar} />
        </div>
        <Typography variant='body1' className={classes.mainText}>
          Enter the verification code we just sent to your email
        </Typography>
        <div className={classes.fieldContainer}>
          <TextField
            autoFocus={false}
            name='code1'
            value={code.code1}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{maxLength: 1, style:{textAlign: 'center'}}}
          />
          <TextField
            active
            name='code2'
            value={code.code2}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{maxLength: 1, style:{textAlign: 'center'}}}
          />
          <TextField
            name='code3'
            value={code.code3}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{maxLength: 1, style:{textAlign: 'center'}}}
          />
          <TextField
            name='code4'
            value={code.code4}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{maxLength: 1, style:{textAlign: 'center'}}}
          />
          <TextField
            name='code5'
            value={code.code5}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{maxLength: 1, style:{textAlign: 'center'}}}
          />
          <TextField
            name='code6'
            value={code.code6}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{maxLength: 1, style:{textAlign: 'center'}}}
          />
          
        </div>
        
        <Typography variant='body2' className={classes.secondaryText}>
          Didn`t recieve a code? <span className={classes.resendButton}>Resend</span>
        </Typography>
        <Button
          variant='contained'
          className={classes.button}
          fullWidth
          onClick={create}
        >
          Verify
          {loading && (
            <CircularProgress size={20} className={classes.progress}/>
          )}
        </Button>
      </Paper>
      <Notification />
    </div>
  )
}

export default ResetPassword

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin'

//MUI
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  CardActions,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'


const useStyles = makeStyles({
  root: {
    height: '1px',
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    justifyContent: 'flex-start',
    backgroundImage: 'url("./images/LoginBg.png")',
    backgroundRepeat: 'no-repeat'
  },
  loginCard: {
    minWidth: '300px',
    marginTop: '6em',
    background: '#fff',
    padding: '1em'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2em',
    fontWeight: 'bolder'
  },
  loginAvatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    color: '#ff7900'
  },
  form: {
    display: 'block',
    marginTop: 0,
  },
  loginForm: {
    padding: '0 1em 1em 1em',
  },
  textField: {
    marginTop: '1em',
  },
  forgotPassword: {
    marginLeft: '1em',
    textDecoration: 'none',
    color: '#ff7900'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    marginTop: '3em',
    background: '#ff7900',
    color: '#fff',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
})

const MyLoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const login = useLogin()
  const notify = useNotify()
  const submit = e => {
    setLoading(true)
    e.preventDefault()
    // will call authProvider.login({ email, password })
    // eslint-disable-next-line no-unused-vars
    login({ email, password }).catch((error) => {
      setLoading(false)
      notify('Invalid email or password')
    }
    )
  }

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <div className={classes.root}>
        <Paper className={classes.loginCard}>
          <div className={classes.loginAvatar}>
            <Avatar >
              <LockIcon className={classes.icon} />
            </Avatar>
          </div>
          <Typography
            variant='h6'
            className={classes.title}
          >
            Sign in to your account
          </Typography>
          <form onSubmit={submit}>
            <div className={classes.loginForm}>
              <TextField
                variant='outlined'
                id="email"
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position='start'>
              //       <MailIcon className={classes.icon}/>
              //     </InputAdornment>
              //   ),
              // }}
              />
              <TextField
                variant='outlined'
                id="password"
                name="password"
                type="password"
                label="password"
                className={classes.textField}
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position='start'>
              //       <KeyIcon className={classes.icon} />
              //     </InputAdornment>
              //   ),
              // }}
              />
            </div>
            <Typography
              className={classes.forgotPassword}
              variant='overline'
              component={Link}
              to='/forgot-password'
            >
              Forgot password?
            </Typography>
            <CardActions className={classes.buttonContainer}>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                Sign in
                {loading && (
                  <CircularProgress size={20} className={classes.progress} />
                )}
              </Button>
            </CardActions>
          </form>
        </Paper>
        <Notification />
      </div>
    </ThemeProvider>
  )
}

export default MyLoginPage

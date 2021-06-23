import React, { useState } from 'react'
import PropTypes from 'prop-types'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    margin: '2em 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  emailField: {
    marginBottom: '2em'
  }


})


// eslint-disable-next-line no-unused-vars
const ContactField = ({ handleNext, handleClose, loading }) => {
  const [form, setForm] = useState({
    name: '',
    email: ''
  })
  const classes = useStyles()
  const handleClick = (e) => {
    e.preventDefault()
    handleNext([form])
  }

  const handleChange = ({ currentTarget: { name, value } }) => {
    setForm((state) => ({ ...state, [name]: value }))
  }

  return (
    <div className={classes.root}>
      <Typography variant='overline' className={classes.bodyText} >
        Enter Name and Email
      </Typography>
      <form onSubmit={(e) => handleClick(e)} className={classes.form}>
        <TextField
          autoFocus
          margin="dense"
          name='name'
          value={form.name}
          label="Name"
          type="text"
          fullWidth
          onChange={handleChange}
          className={classes.nameField}
        />
        <TextField
          margin="dense"
          name='email'
          value={form.email}
          label="Email Address"
          type="email"
          required
          fullWidth
          onChange={handleChange}
          className={classes.emailField}
        />
        <Button
          type='submit'
          color="primary"
          disabled={loading}
          fullWidth
          variant='outlined'
          className={classes.btn}
        >
          Next
          {loading && (
            <CircularProgress size={20} />
          )}
        </Button>
      </form>

    </div>
  )
}

ContactField.propTypes = {
  handleNext: PropTypes.func,
  handleClose: PropTypes.func,
  loading: PropTypes.bool
}

export default ContactField

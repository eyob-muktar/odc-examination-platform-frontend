import React, { useState } from 'react'
import PropTypes from 'prop-types'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Button,
  CircularProgress
} from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const useStyles = makeStyles({
  root: {
    marginBottom: '2em'
  },
  list: {
    width: '100%',
    maxWidth: '36ch',
    marginBottom: '1em'
  },
  inline: {
    display: 'inline',
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  emailField: {
    marginBottom: '2em'
  },
  btn: {
    margin: '1em 0'
  },
  progress: {
    position: 'absolute'
  }
})


// eslint-disable-next-line no-unused-vars
const ContactDisplay = ({ examinees, create, loading, setCurrentStep, expiresAt, setExpiresAt }) => {
  const [selectedDate, handleDateChange] = useState(new Date())
  const classes = useStyles()
  const handleClick = () => {
    setExpiresAt(selectedDate._d)
    expiresAt && create()
  }

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {examinees.map(examinee => {
          return (
            <ListItem key={examinee.email} alignItems='flex-start' >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={examinee.name} secondary={examinee.email} />
            </ListItem>)
        })}
      </List>
      <MuiPickersUtilsProvider
        utils={MomentUtils}
      >
        <DateTimePicker
          value={selectedDate}
          onChange={handleDateChange}
          label='Expiration Time'
          color='secondary'
          className={classes.timePicker}
        />
      </MuiPickersUtilsProvider>
      <Button
        onClick={handleClick}
        color="primary"
        disabled={loading}
        fullWidth
        variant='outlined'
        className={classes.btn}
      >
        Send
        {loading && (
          <CircularProgress className={classes.progress} size={20} />
        )}
      </Button>
      <Button
        onClick={() => setCurrentStep(1)}
        fullWidth
        variant='outlined'
        className={classes.btn}
      >
        Back
      </Button>
    </div>
  )
}

ContactDisplay.propTypes = {
  examinees: PropTypes.array,
  loading: PropTypes.bool,
  create: PropTypes.func,
  setCurrentStep: PropTypes.func,
  expiresAt: PropTypes.string,
  setExpiresAt: PropTypes.func
}

export default ContactDisplay

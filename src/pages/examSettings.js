import React from 'react'

// MUI
import { makeStyles } from '@material-ui/core'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles({
  dialogContainer: {
    minHeight: '200px',
    minWidth: '400px',
    position: 'relative',
  },
  title: {
    textAlign: 'center'
  },
  closeIcon: {
    position: 'absolute',
    right: '5px',
    top: '5px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    margin: '1em 0'
  }
})

// eslint-disable-next-line react/prop-types
const ExamSettings = ({open, setOpen}) => {
  const classes = useStyles()
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Dialog open={open} className={classes.dialogContainer}>
        <DialogTitle className={classes.title}>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          <h3>Test Settings</h3>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            name='name'
            label='Test Name'
            helperText='Give your test a descriptive name'
            className={classes.textField}
          />
          <TextField
            name='startDate'
            label='Starting Date'
            type='time'
            defaultValue='07:30'
            className={classes.textField}
          />
          <TextField
            name='endingDate'
            label='Ending Date'
            type='date'
            defaultValue='07:30'
            className={classes.textField}
          />
          <Button
            color='secondary'
            variant='contained'
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ExamSettings

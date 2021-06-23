/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUpdate, useNotify, useRedirect, useRefresh } from 'ra-core'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Fab,
  IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'



const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paperWidthSm': {
      background: 'url(/images/edit-exam-bg.png)',
      padding: '4em',
      maxWidth: '600px'
    }
  },
  title: {
    textAlign: 'center',
    margin: '2em'
  },
  titleField: {
    marginBottom: '2em',
    '& .MuiInputBase-root': {
      fontSize: '1.5rem'
    }
  },
  descField: {
    marginBottom: '2em',
  },
  timeField: {
    marginBottom: '2em'
  },
  addIcon: {
    color: '#fff'
  },
  progress: {
    position: 'absolute'
  },
  editBtn: {
    color: '#fff'
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0'
  },
  fab: {
    background: '#fff',
    border: '1px solid #fff'
  },
  closeIcon: {
    border: '1px solid',
    borderRadius: '50%'
  },
})

const EditExams = ({ id, title, description, timeAllowed, loaded }) => {
  const classes = useStyles()
  const [newTitle, setTitle] = useState(title)
  const [newDescription, setDescription] = useState(description)
  const [newTimeAllowed, setTimeAllowed] = useState(timeAllowed)
  const [open, setOpen] = useState(false)
  const notify = useNotify()
  const refresh = useRefresh()
  const [update, { loading }] = useUpdate(
    'exams',
    id,
    {
      title: newTitle,
      description: newDescription,
      timeAllowed: newTimeAllowed
    },
    {
      title,
      description,
      timeAllowed
    },
    {
      onSuccess: () => {
        notify('Exam Updated Successfully', 'info')
        refresh()
      },
      onFailure: (error) => {
        error.body.error ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
      }
    }
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const handleChange = ({ currentTarget: { name, value } }) => {
  //   setForm((state) => ({ ...state, [name]: value }))
  //   console.log(form.email)
  // }
  return (
    <div>
      <IconButton
        disabled={!loaded}
        className={classes.btn}
        color="primary"
        onClick={handleClickOpen}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle
          id="form-dialog-title"
          className={classes.title}
        >
          Edit
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            update()
          }
          } className={classes.form}>
            <TextField
              variant='filled'
              name='title'
              value={newTitle}
              label="Title"
              type="text"
              className={classes.titleField}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              variant='filled'
              name='description'
              value={newDescription}
              label="Description"
              type="text"
              className={classes.descField}
              multiline
              rows={3}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              variant='filled'
              name='timeAllowed'
              value={newTimeAllowed}
              label="Time Allowed"
              type="number"
              className={classes.timeField}
              helperText='Enter the time in minutes'
              fullWidth
              onChange={(e) => setTimeAllowed(e.target.value)}
            />
            <Button
              type='submit'
              color="primary"
              variant='contained'
              disabled={loading}
              className={classes.editBtn}
              fullWidth
            >
              Edit
              {loading && (
                <CircularProgress size={20} />
              )}
            </Button>
          </form>
          <div className={classes.closeContainer}>
            <Fab
              className={classes.fab}
              onClick={handleClose}
            >
              <CloseIcon
                color='primary'
                className={classes.closeIcon}
              />
            </Fab>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

EditExams.propTypes = {
  id: PropTypes.string,
  timeAllowed: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  loaded: PropTypes.bool
}

export default EditExams

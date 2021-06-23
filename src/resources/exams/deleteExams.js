/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCreate, useDelete, useMutation, useNotify, useRefresh } from 'ra-core'

// MUI
import { DialogContentText, DialogTitle, DialogContent, DialogActions, Dialog, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import { findByLabelText } from '@testing-library/dom'

const useStyles = makeStyles({
  btn: {
    margin: '0 1em',
    position: 'absolute',
    right: '2em',
    top: '1em',
    color: '#ff0000'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '& .MuiTypography-h6': {
      textAlign: 'center'
    }
  },
  deleteIcon: {
    fontSize: '5rem',
    color: '#ff0000'
  },
  content: {
    textAlign: 'center'
  },
  cancelBtn: {
  },
  deleteBtn: {
    background: '#ff0000',
    color: '#fff',
  }
})

const DeleteExam = ({ id }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const refresh = useRefresh()
  const notify = useNotify()
  const [deleteOne, { loading }] = useDelete(
    'exams',
    id,
    {
      onSuccess: () => {
        notify('Exam Deleted', 'info')
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


  return (
    <div>
      <Button variant="outlined" startIcon={<DeleteIcon />} color='warning' className={classes.btn} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          <DeleteIcon className={classes.deleteIcon} />
          
        </DialogTitle>
        <DialogContent className={classes.content}>
          Are you sure you want to delete?
          <DialogContentText id="alert-dialog-description">
            If you delete this exam it wont be accessible for any one.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={handleClose}
            className={classes.cancelBtn}>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={deleteOne}
            color="warning"
            className={classes.deleteBtn}
            disabled={loading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

DeleteExam.propTypes = {
  id: PropTypes.string.isRequired
}

export default DeleteExam
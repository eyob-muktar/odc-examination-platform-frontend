/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCreate, useDelete, useMutation, useNotify, useRefresh } from 'ra-core'

// MUI
import { DialogContentText, DialogTitle, DialogContent, DialogActions, Dialog, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import { findByLabelText } from '@testing-library/dom'

const useStyles = makeStyles({
  btn: {
    // background: '#ff5500',
    color: '#ff0000',
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
  progress: {
    position: 'relative'
  }
})

const CancelInvitation = ({ id, finished, examinees }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const refresh = useRefresh()
  const notify = useNotify()
  const [create, { loading }] = useCreate(
    `exams/${id}/cancel-invitations`,
    { examinees: [examinees] },
    {
      onSuccess: () => {
        notify('Invitation Cancelled', 'info')
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
      <Button
        variant="outlined"
        className={classes.btn}
        onClick={handleClickOpen}
        disabled={finished}
      >
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          Are you sure you want to cancel this invitation?
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            If you cancel it the examinee won`t be able to access it
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={handleClose}
            className={classes.cancelBtn}>
            No
          </Button>
          <Button
            variant='contained'
            onClick={create}
            className={classes.deleteBtn}
            disabled={loading}>
            Yes! Cancel
            {
              loading &&
              <CircularProgress size={20} className={classes.progress} />
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

CancelInvitation.propTypes = {
  id: PropTypes.string.isRequired,
  examinees: PropTypes.string,
  finished: PropTypes.bool
}

export default CancelInvitation
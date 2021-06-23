import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDelete, useNotify, useRefresh } from 'react-admin'

// MUI
import { DialogContentText, DialogTitle, DialogContent, DialogActions, Dialog, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paperWidthSm': {
      background: 'linear-gradient(104deg, #ff7900 -39%, #f8e46f 124%)',
      padding: '4em',
      maxWidth: '600px'
    }
  },
  mainContent: {
    background: '#fff',
  },
  btn: {
    margin: '0 1em',
    position: 'absolute',
    right: '2em',
    top: '2em',
    background: '#ff0000',
    color: '#fff'
  },
  title: {
    display: 'flex',
    marginTop: '2em',
    justifyContent: 'center',
    flexDirection: 'column',
    '& .MuiTypography-h6': {
      textAlign: 'center'
    }
  },
  secondText: {
    marginTop: '1em',
    marginBottom: '2em',
    color: '#808080'
  },
  deleteIcon: {
    fontSize: '5rem',
    color: '#dd0000'
  },
  content: {
    textAlign: 'center',
    color: '#808080',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  cancelBtn: {
  },
  deleteBtn: {
    background: '#ff0000',
    color: '#fff',
  },
  progress: {
    position: 'absolute'
  }
})

const Delete = ({ id, resource }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const refresh = useRefresh()
  const notify = useNotify()
  const [deleteOne, { loading }] = useDelete(
    resource,
    id,
    {},
    {
      onSuccess: () => {
        notify('Deleted Successfully', 'info')
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
      <Button variant="contained" startIcon={<DeleteIcon />} className={classes.btn} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        className={classes.root}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.mainContent}>
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            <DeleteIcon className={classes.deleteIcon} />
          </DialogTitle>
          <DialogContent className={classes.content}>
            Are you sure you want to delete?
            <DialogContentText id="alert-dialog-description" className={classes.secondText}>
              Once deleted it can`t be recovered!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              onClick={handleClose}
              fullWidth
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={deleteOne}
              color="warning"
              className={classes.deleteBtn}
              disabled={loading}
              fullWidth
            >
              Delete
              {loading &&
                <CircularProgress size={20} className={classes.progress} />
              }
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

Delete.propTypes = {
  id: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired
}

export default Delete
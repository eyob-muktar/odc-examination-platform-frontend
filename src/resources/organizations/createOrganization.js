import React, { useState } from 'react'
import { useCreate, useNotify, useRefresh } from 'ra-core'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paperWidthSm': {
      background: 'url(/images/final.png)',
      paddingBottom: '2em',
      backgroundSize: 'cover'
    }
  },
  title: {
    textAlign: 'center',
    marginTop: '3em'
  },
  form: {
    margin: '0 2em'
  },
  emailField: {
    margin: '1em 0'
  },
  createBtn: {
    margin: '2em 0',
    color: '#fff'
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0'
  },
  fab: {
    background: '#fff',
    border: '1px solid'
  },
  closeIcon: {
    border: '1px solid',
    borderRadius: '50%'
  },
  submitBtn: {
    color: '#fff',
    margin: '2em 0'
  }
})

const CreateOrganizations = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    organizationName: '',
    organizationDescription: '',
    adminName: '',
    adminEmail: ''
  })
  const refresh = useRefresh()
  const notify = useNotify()
  const [create, { loading }] = useCreate(
    'organizations',
    form,
    {
      onSuccess: () => {
        notify('Organization Created Successfully', 'info')
        setForm({
          organizationName: '',
          organizationDescription: '',
          adminName: '',
          adminEmail: ''
        })
        refresh()
      },
      onFailure: (error) => {
        error.body.error ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
        refresh()
      }
    }
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = ({ currentTarget: { name, value } }) => {
    setForm((state) => ({ ...state, [name]: value }))
  }

  return (
    <div>
      <Button startIcon={<AddIcon />} variant="outlined" color="primary" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
        <DialogTitle id="form-dialog-title" className={classes.title}>Add New Organization</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            create()
          }} className={classes.form}>
            <TextField
              autoFocus
              margin="dense"
              name='organizationName'
              value={form.organizationName}
              label="Organization Name"
              type="text"
              required
              fullWidth
              variant='filled'
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name='organizationDescription'
              value={form.organizationDescription}
              label="Organization Description"
              type="text"
              fullWidth
              variant='filled'
              onChange={handleChange}
              multiline
            />
            <TextField
              margin="dense"
              required
              name='adminName'
              value={form.adminName}
              label="Admin Name"
              type="text"
              fullWidth
              variant='filled'
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              required
              name='adminEmail'
              value={form.adminEmail}
              label="Admin Email Address"
              type="email"
              fullWidth
              variant='filled'
              onChange={handleChange}
            />
            <Button
              type='submit'
              color="primary"
              className={classes.submitBtn}
              disabled={loading}
              variant='contained'
              fullWidth
            >
              Create
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

export default CreateOrganizations
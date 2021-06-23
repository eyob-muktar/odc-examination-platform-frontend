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
      maxWidth: '450px',
      backgroundSize: 'cover'
    }
  },
  btn: {
    color: '#fff'
  },
  title: {
    textAlign: 'center',
    marginTop: '4em'
  },
  form: {
    margin: '0 2em'
  },
  nameField: {
    background: '#fff'
  },
  emailField: {
    margin: '1em 0',
    background: '#fff'
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
    border: '1px solid #fff',
    boxShadow: '0px 0px 0px 0px'
  },
  closeIcon: {
    border: '1px solid',
    borderRadius: '50%'
  }
})

const CreateExaminers = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: ''
  })
  const refresh = useRefresh()
  const notify = useNotify()
  const orgId = localStorage.getItem('org-id')
  const [create, { loading }] = useCreate(
    `organizations/${orgId}/add-examiner`,
    {
      examinerEmail: form.email,
      examinerName: form.name
    },
    {
      onSuccess: () => {
        notify('Examiner Created Successfully', 'info')
        setForm({
          name: '',
          email: ''
        })
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

  const handleChange = ({ currentTarget: { name, value } }) => {
    setForm((state) => ({ ...state, [name]: value }))
    console.log(form.email)
  }

  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        className={classes.btn}
        color="primary"
        onClick={handleClickOpen}
      >
        Create
      </Button>
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
          Add New Examiner
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            create()
          }
          } className={classes.form}>
            <TextField
              variant='filled'
              margin="dense"
              name='name'
              value={form.name}
              label="Name"
              type="text"
              className={classes.nameField}
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              variant='filled'
              margin="dense"
              name='email'
              value={form.email}
              label="Email Address"
              type="email"
              className={classes.emailField}
              fullWidth
              required
              onChange={handleChange}
            />
            <Button
              type='submit'
              color="primary"
              variant='contained'
              disabled={loading}
              className={classes.createBtn}
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

export default CreateExaminers
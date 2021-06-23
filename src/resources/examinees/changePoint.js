import React, { useState } from 'react'
import PropTypes from 'prop-types'
// MUI
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useNotify, useRefresh, useUpdate } from 'react-admin'

const ChangePoint = ({ id, max }) => {
  const [point, setPoint] = useState(0)
  const [open, setOpen] = React.useState(false)
  const notify = useNotify()
  const refresh = useRefresh()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [update, { loading }] = useUpdate(
    'examinee-answers',
    id,
    {
      pointsGained: point
    },
    {
      point
    },
    {
      mutationMode: 'optimistic',
      onSuccess: () => {
        notify('Point Changed Successfully', 'info')
        refresh()
      },
      onFailure: (error) => {
        error.body ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
      }
    }
  )

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton aria-label="Edit" onClick={handleClickOpen}>
          <EditIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change The Point</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="point"
            label="Point"
            type="number"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            InputProps={{ inputProps: { min: 0, max: max } }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={update} color="primary">
            Change
            {
              loading &&
              <CircularProgress size={20} />
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

ChangePoint.propTypes = {
  id: PropTypes.string,
  max: PropTypes.number
}

export default ChangePoint

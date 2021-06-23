/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCreate, useNotify, useRefresh } from 'ra-core'

// MUI
import { Typography, DialogTitle, DialogContent, Dialog, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InviteIcon from '@material-ui/icons/InsertInvitation'

import ContactImporter from '../../components/contactImporter'
import ContactField from '../../components/contactField'
import ContactDisplay from '../../components/displayContacts'

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paperWidthSm': {
      // background: 'url(/images/csv-bg.png)',
      padding: '0 4em',
      maxWidth: '600px',
      // backgroundSize: 'cover'
    }
  },
  btn: {
    margin: '0 1em'
  },
  title: {
    marginTop: '1em'
  },
  importBtn: {
    color: '#ff7900',
    fontSize: '1em'
  },

})

const InviteExaminees = ({ id }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [showField, setShowField] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [examinees, setExaminees] = useState([])
  const [expiresAt, setExpiresAt] = useState('')
  const refresh = useRefresh()
  const notify = useNotify()
  const [create, { loading }] = useCreate(
    `exams/${id}/invite-examinees`,
    { expiresAt, examinees },
    {
      onSuccess: () => {
        notify('Invitation exam sent', 'info')
        refresh()
      },
      onFailure: (error) => {
        error.body.error ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
      }
    }
  )

  // const handleSubmit = (form, date) => {
  //   setExaminees(form)
  //   setExpiresAt(date)
  //   examinees.length !== 0 && create()
  // }

  const handleNext = (form) => {
    setExaminees(form)
    setCurrentStep(2)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFile = (examineeList, date) => {
    setExaminees(prevExaminees => {
      return [...prevExaminees, ...examineeList]
    })
  }

  const handleRemoveFile = () => {
    setExaminees([])
  }

  return (
    <div>
      <Button
        startIcon={<InviteIcon />}
        color="primary"
        onClick={handleClickOpen}
        disabled={!id}
        className={classes.btn}>
        Invite
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        {/* <DialogTitle
          id="form-dialog-title"
          className={classes.title}
        >
          Send email to invite Examinee
        </DialogTitle> */}
        <DialogContent>
          {currentStep === 1 && showField
            &&
            <>
              <ContactField handleClose={handleClose} handleNext={handleNext} loading={loading} />
              <Typography variant='caption' className={classes.bodyText} >
                Or
                <Button
                  className={classes.importBtn}
                  onClick={() => setShowField(false)}
                >
                  Import
                </Button>
                a csv file
              </Typography>
            </>
          }
          {
            currentStep === 1 && !showField
            &&
            <>
              <ContactImporter
                handleFile={handleFile}
                handleRemoveFile={handleRemoveFile}
                examinees={examinees}
                handleClose={handleClose}
                setCurrentStep={setCurrentStep}
              />
              <Typography variant='caption' className={classes.bodyText} >
                Or
                <Button
                  className={classes.importBtn}
                  onClick={() => setShowField(true)}
                >
                  Enter
                </Button>
                contact info.
              </Typography>

            </>
          }
          {
            currentStep === 2
            &&
            <ContactDisplay
              create={create}
              setCurrentStep={setCurrentStep}
              loading={loading}
              examinees={examinees}
              expiresAt={expiresAt}
              setExpiresAt={setExpiresAt}
            />
          }

        </DialogContent>
      </Dialog>
    </div>
  )

}

InviteExaminees.propTypes = {
  id: PropTypes.string.isRequired
}

export default InviteExaminees
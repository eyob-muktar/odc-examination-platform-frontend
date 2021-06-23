/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNotify } from 'react-admin'
import { CSVReader } from 'react-papaparse'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const useStyles = makeStyles({
  root: {
    margin: '2em 2em',
    // background: 'url(/images/csv-bg.png)',

  },
  bodyText: {
    marginBottom: '2em'
  },
  btn: {
    marginTop: '2em',
    background: '#ff7900',
    color: '#fff'
  },
  timePicker: {
    marginTop: '4em'
  },
  container: {
    marginTop: '4em',
    display: 'flex',
    flexDirection: 'column'
  }
})

const ContactImporter = ({ handleFile, handleRemoveFile, setCurrentStep, examinees, handleClose }) => {
  const notify = useNotify()
  const classes = useStyles()
  const [contactInfo, setContactInfo] = useState([])


  const handleOnDrop = (data) => {
    // Mapping the parsed csv into a variable
    const contactInfos = data.map(examineeInfo => {
      return { email: examineeInfo.data.Email || examineeInfo.data.email, name: examineeInfo.data.Name || examineeInfo.data.name }
    })
    // checking whether the variable got the correct fields
    const rightInfo = contactInfos.filter(info => {
      return (info.email !== undefined || '')
    })

    if (rightInfo.length === 0) {
      notify(
        'The file you uploaded doesn`t contain the correct fields. Please make sure you upload a csv file containing Email header',
        'warning')
    } else {
      setContactInfo(rightInfo)
      handleFile(rightInfo)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleOnError = (err, file, inputElem, reason) => {
    notify('Something went wrong. Please try again!', 'warning')
  }

  return (
    <div className={classes.root}>
      <Typography variant='overline' className={classes.bodyText} >
        {/* Import a CSV file containing email and name */}
      </Typography>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        removeButtonColor='#659cef'
        onRemoveFile={handleRemoveFile}
        config={{ header: true }}
      >
        {/* <span> Drop CSV file here or click to upload.</span> */}
      </CSVReader>
      <div className={classes.container}>
        <Button
          onClick={() => setCurrentStep(2)}
          variant='contained'
          disabled={!examinees.length}
          className={classes.btn}
        >
          Next
          {false && (
            <CircularProgress size={20} />
          )}
        </Button>
      </div>
    </div>
  )
}

ContactImporter.propTypes = {
  handleFile: PropTypes.func,
  handleRemoveFile: PropTypes.func,
  examinees: PropTypes.array,
  handleClose: PropTypes.func,
  setCurrentStep: PropTypes.func
}

export default ContactImporter

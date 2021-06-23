/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import QuestionForm from '../resources/exams/create/questionForm'
import { useCreate, useNotify } from 'react-admin'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Editor from '../components/editor'


const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: '#eee',
    padding: '2em',
  },
  saveButton: {
    position: 'fixed',
    bottom: '2em',
    right: '4em',
    color: '#fff',
    zIndex: '1000'
  },
  title: {
    padding: '2em',
    borderTop: '10px solid #ff7900'
  },
  line: {
    color: '#000'
  },
  mainTitle: {
    width: '70%',
    marginBottom: '1em',
    '& .MuiInputBase-root': {
      fontSize: '2rem'
    }
  },
  desc: {
    width: '70%',
    '& .MuiOutlinedInput-root:before': {
      borderBottom: '0px'
    }
  }
})

const AddExam = () => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [count, setCount] = useState(1)




  return (
    <div className={classes.root}>
      {/* <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        >
          <MenuItem value={'python'}>Python</MenuItem>
          <MenuItem value={'php'}>PHP</MenuItem>
          <MenuItem value={'javascript'}>Javascript</MenuItem>
        </Select>
      </FormControl>
      <Editor language={language} value={value} onChange={setValue} /> */}
      {/* <Button
          variant='contained'
          color='primary'
          className={classes.saveButton}
          onClick={create}
          disabled={loading}
        > Save </Button>
      </div> */}
      <Paper className={classes.title}>
        <TextField
          className={classes.mainTitle}
          value={language}
          placeholder='Exam Title'
          onChange={(e) => console.log(e.target.value)}
        />
        <TextField
          className={classes.desc}
          value={value}
          variant='outlined'
          placeholder='Description'
          onChange={e => console.log(e.target.value)}
          multiline
          rows={2}
        />
      </Paper>
      {
        Array.from({ length: count }, (_, index) => <QuestionForm key={index} handleQuestions={console.log('a')} />)}
      <Fab
        color='primary'
        onClick={() => setCount(count + 1)}
        size='large'
      >
        <AddIcon color='inherit' />
      </Fab>
    </div>
  )
}

export default AddExam

import React, { useState, useEffect } from 'react'
import { useCreate, useNotify, useRedirect } from 'react-admin'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Button, Paper, TextField, CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
//
import QuestionForm from '../../components/Questions/questionForm2'


const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: '#f9f9f9',
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
  },
  time: {
    margin: '1em'
  },
  addIcon: {
    color: '#fff'
  },
  progress: {
    position: 'absolute'
  }
})

const CreateExams = () => {
  const classes = useStyles()
  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState('Exam Title')
  const [description, setDescription] = useState('Description...')
  const [count, setCount] = useState(1)
  const [timeAllowed, setTimeAllowed] = useState(90)
  const [active, setActive] = useState(0)
  const notify = useNotify()
  const redirect = useRedirect()

  const orgId = localStorage.getItem('org-id')

  useEffect(() => {
    if (!questions[active - 1]) {
      let questionsCopy = questions
      questionsCopy.splice(active - 1, 0, {})
    }
  }, [active])

  const [create, { loading }] = useCreate(
    'exams',
    {
      organizationId: orgId,
      title,
      description,
      questions,
      timeAllowed
    },
    {
      onSuccess: () => {
        notify('Exam Created Successfully', 'info')
        redirect('/exams')
      },
      onFailure: (error) => {
        error.body.error ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
      }
    }
  )

  const handleQuestions = (question, number) => {
    let questionsCopy = questions
    questionsCopy.splice(number, 1, question)
    setQuestions(questionsCopy)
  }

  return (
    <div className={classes.root}>
      <div>
        <Button
          variant='contained'
          color='primary'
          className={classes.saveButton}
          onClick={create}
          disabled={loading}
        > Save
          {loading && (
            <CircularProgress className={classes.progress} size={20} />
          )}
        </Button>
      </div>
      <Paper className={classes.title} elevation={0}>
        <TextField
          className={classes.mainTitle}
          value={title}
          placeholder='Exam Title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.desc}
          value={description}
          variant='outlined'
          placeholder='Description'
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={2}
        />
        <TextField
          className={classes.time}
          value={timeAllowed}
          label='Time Allowed'
          variant='filled'
          type='number'
          helperText='Enter the time allowed in minutes'

          onChange={e => setTimeAllowed(e.target.value)}
        />
      </Paper>
      {
        Array.from({ length: count }, (_, index) => <QuestionForm key={index} number={index} handleQuestions={handleQuestions} />)}
      <Fab
        color='primary'
        onClick={() => {
          setCount(count + 1)
          setActive(count)
        }}
        size='large'
      >
        <AddIcon className={classes.addIcon} />
      </Fab>
    </div>
  )
}

export default CreateExams

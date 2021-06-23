import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
// import CopyIcon from '@material-ui/icons/FileCopy'

import Question from '../../../components/Results/question'
import { useCreate, useNotify, useRedirect } from 'ra-core'

const useStyles = makeStyles({
  root: {
    '& table': {
      border: '1px'
    },
    background: '#fff'
  },
  header: {
    display: 'flex',
    margin: '2em',
    justifyContent: 'space-between'
  },
  btn: {
    background: '#ff7900',
    color: '#fff',
  },
  questionContainer: {
    background: '#f9f9f9'
  }
})

const AddQuestions = () => {
  const classes = useStyles()
  const notify = useNotify()
  const redirect = useRedirect()
  const questions = useSelector(state => state.Questions)
  const examInfo = useSelector(state => state.examInfo)
  const orgId = localStorage.getItem('org-id')

  const [create, { loading }] = useCreate(
    'exams',
    {
      organizationId: orgId,
      title: examInfo?.title || 'Untitled',
      description: examInfo?.desc || 'description',
      questions,
      timeAllowed: 90
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

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant='h5' >
          {examInfo.title ? examInfo.title : 'Untitled Exam'} Questions
        </Typography>
        <Button
          className={classes.btn}
          startIcon={<AddIcon />}
          variant='contained'
          component={Link}
          to='/create'
        >
          Add Questions
        </Button>
      </div>
      <Typography variant='body'>
        You have added {questions.length} questions
      </Typography>
      <div className={classes.questions}>
        {
          questions?.map((question, index) => {
            return (
              <div className={classes.questionContainer} key={index}>
                <Question
                  question={question}
                  correct={true}
                  answerGiven={question.question.correctAnswers}
                />
              </div>
            )
          })
        }
      </div>
      <Button
        variant='contained'
        className={classes.btn}
        disabled={!questions.length}
        onClick={create}
      >
        submit
        {
          loading
          &&
          <CircularProgress size={20} className={classes.btn} />
        }
      </Button>
    </div>
  )
}

export default AddQuestions

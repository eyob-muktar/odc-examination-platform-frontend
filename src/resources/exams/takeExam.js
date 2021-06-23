/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, Divider, Paper, Typography } from '@material-ui/core'

import Question from '../../components/question'
import QuestionForm from '../../components/Questions/questionForm2'
import { useCreate, useNotify, useRedirect } from 'ra-core'
import { Notification } from 'ra-ui-materialui'
import CountDownTimer from '../../utils/countDownTimer'

const useStyles = makeStyles({
  root: {
    background: '#fff',
    marginLeft: '300px',
  },
  sidebar: {
    boxSizing: 'border-box',
    padding: '2em',
    border: 'solid 1px #707070',
    position: 'fixed',
    top: '0px',
    left: '1px',
    bottom: '0px',
    width: '300px',
  },
  logo: {
    fontSize: '2em',
    marginBottom: '1.5em'
  },
  timer: {
    fontSize: '1em'
  },
  title: {
    marginBottom: '.5em',
    marginTop: '1.5em'
  },
  desc: {
    margin: '1em 0',
    color: '#808080'
  },

  submitBtn: {
    marginTop: '2em',
    background: '#ff7900',
    color: '#fff'
  },
  progress: {
    position: 'absolute'
  }
})

// const exam = {
//   title: 'Exam Title',
//   description: 'A javascript exam from Odc company',
//   timeAllowed: '120',
//   questions: [
//     {
//       points: 1,
//       question: {
//         question: 'What is the best Array?',
//         type: 'multipleChoice',
//         answerOptions: ['choice1', 'choice2', 'choice3', 'choice4']
//       }
//     },
//     {
//       points: 2,
//       question: {
//         question: 'What is the best Object?',
//         type: 'shortAnswer',
//         answerOptions: []
//       }
//     },
//     {
//       points: 3,
//       question: {
//         question: 'What is the best Array?',
//         type: 'checkBox',
//         answerOptions: ['choice1e', 'choice32', 'choice2333', 'choic3e4']
//       }
//     },
//     {
//       points: 4,
//       question: {
//         question: 'What is the best Array?',
//         type: 'paragraph',
//         answerOptions: []
//       }
//     },
//     {
//       points: 5,
//       question: {
//         question: 'What is the best Array?',
//         type: 'multipleChoice',
//         answerOptions: ['choice1', 'choice2', 'choice3', 'choice4']
//       }
//     },
//   ]
// }

const TakeExam = (props) => {
  const classes = useStyles()
  const redirect = useRedirect()
  const exam = useSelector(state => state.examQuestions)

  const answerArray = new Array(exam.questions.length)
  const [answers, setAnswers] = useState(answerArray)
  const examineeEmail = localStorage.getItem('examineeEmail')
  const accessKey = localStorage.getItem('accessKey')
  const notify = useNotify()

  const hours = parseInt(exam.timeAllowed / 60)
  const minutes = parseInt(exam.timeAllowed) % 60
  const hoursMinSecs = { hours, minutes, seconds: 0 }

  const [create, { loading }] = useCreate(
    `exams/${exam._id}/submit-answers`,
    {
      examineeEmail,
      accessKey,
      answers
    },
    {
      onSuccess: () => {
        redirect('/exam-finished')
      },
      onFailure: (error) => {
        error.body.error ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
      }
    }
  )



  const handleAnswers = (answer, index, id) => {
    const answersCopy = answers
    const newAnswer = {
      examQuestionId: id,
      answers: [answer]
    }
    answersCopy.splice(index, 1, newAnswer)
    setAnswers(answersCopy)
    console.log(answers)
  }

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <div className={classes.logo}>
          TestDome
        </div>
        <Typography variant='caption'>
          Time Left
        </Typography>
        <CountDownTimer className={classes.timer} hoursMinSecs={hoursMinSecs} />
        <Typography variant='h4' className={classes.title}>
          {exam.title}
        </Typography>
        <Divider />
        <Typography variant='h6' className={classes.desc}>
          {exam.description}
        </Typography>
        <Divider />
        <Button
          variant='contained'
          className={classes.submitBtn}
          onClick={create}
          fullWidth
        >
          Submit
          {
            loading &&
            <CircularProgress className={classes.progress} />
          }
        </Button>
      </div>
      <div className={classes.content}>
        {
          exam.questions.map((question, index) => {
            return <Question key={index} question={question} handleAnswers={handleAnswers} index={index} />
          })
        }
      </div>

      <Notification />
    </div>
  )
}


export default TakeExam

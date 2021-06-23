/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, Paper, Typography } from '@material-ui/core'

import Question from './question'
import { useNotify, useQueryWithStore } from 'ra-core'
import { Loading, Notification, Error } from 'ra-ui-materialui'
import { useParams } from 'react-router'

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
    marginTop: '1.5em',
    color: '#808080'
  },
})

// const exam = {
//   title: 'Exam Title',
//   description: 'A javascript exam from Odc company',
//   timeAllowed: '120',
//   questions: [
//     {
//       points: 1,
//       correct: false,
//       question: {
//         question: 'What is the best Array?',
//         type: 'multipleChoice',
//         answerOptions: ['choice1', 'choice2', 'choice3', 'choice4'],
//         correctAnswers: ['choice2'],
//         answerGiven: 'choice3'
//       }
//     },
//     {
//       points: 2,
//       correct: true,
//       question: {
//         question: 'What is the best Object?',
//         type: 'shortAnswer',
//         answerOptions: [],
//         correctAnswers: ['Array'],
//         answerGiven: 'Array'
//       }
//     },
//     {
//       points: 3,
//       correct: false,
//       question: {
//         question: 'What is the best Array?',
//         type: 'checkBox',
//         answerOptions: ['choice1e', 'choice32', 'choice2333', 'choic3e4'],
//         correctAnswers: ['choice32', 'choice3e4'],
//         answerGiven: ['choice32']
//       }
//     },
//     {
//       points: 4,
//       correct: true,
//       question: {
//         question: 'What is a programming Language?',
//         type: 'paragraph',
//         answerOptions: [],
//         answerGiven: 'Its a language of the codes'
//       }
//     },
//     {
//       points: 5,
//       correct: true,
//       question: {
//         question: 'What is an Array?',
//         type: 'multipleChoice',
//         answerOptions: ['choice1', 'choice2', 'choice3', 'choice4'],
//         answerGiven: 'choice1'
//       }
//     },
//     {
//       points: 6,
//       correct: false,
//       question: {
//         question: 'What is a key value pair datastructure in javascript called?',
//         type: 'shortAnswer',
//         answerOptions: [],
//         answerGiven: 'Array'
//       }
//     },
//   ]
// }

const ShowResult = () => {
  const classes = useStyles()
  const { id } = useParams()
  const notify = useNotify()
  console.log(id)

  const { loading, error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'exams/_/exam-invitations',
    payload: { id }
  })
  if (loading) { return <Loading /> }
  if (error) { return error.body ? <Error error={error.body.error} /> : <Error error={'Network Problem! Please Try Again'} /> }

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <div className={classes.logo}>
          TestDome
        </div>
        <Typography variant='h4' className={classes.title}>
          {data?.examInvitation.exam.title}
        </Typography>
      </div>
      <div className={classes.content}>
        {
          data?.examineeAnswers.map((answer, index) => {
            console.log(answer)
            return <Question
              key={index}
              id={answer._id}
              pointsGained={answer.pointsGained}
              question={answer.examQuestion}
              correct={answer.pointsGained !== 0}
              answerGiven={answer.examineeAnswers}
            />
          })
        }
      </div>

      <Notification />
    </div>
  )
}


export default ShowResult



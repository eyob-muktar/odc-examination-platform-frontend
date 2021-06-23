/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, Paper, Typography } from '@material-ui/core'

import Question from '../components/question'
import QuestionForm from '../components/Questions/questionForm2'
import { useCreate, useNotify, useRedirect } from 'ra-core'
import { Notification } from 'ra-ui-materialui'
import CountDownTimer from '../utils/countDownTimer'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: '2em',
    background: '#edf8fd'
  },
  title: {
    padding: '2em',
    borderTop: '10px solid #ff7900'
  },
  mainTitle: {
    marginBottom: '.5em'
  },
  desc: {
    borderBottom: '0px'
  },
  time: {
    margin: '1em 0'
  },
  submitBtn: {
    background: '#ff7900',
    color: '#fff'
  },
  progress: {
    position: 'absolute'
  }
})

const exam = {
  title: 'Exam Title',
  description: 'A javascript exam from Odc company',
  timeAllowed: '120',
  questions: [
    {
      points: 1,
      question: {
        question: 'What is the best Array?',
        type: 'multipleChoice',
        answerOptions: ['choice1', 'choice2', 'choice3', 'choice4']
      }
    },
    {
      points: 2,
      question: {
        question: 'What is the best Object?',
        type: 'shortAnswer',
        answerOptions: []
      }
    },
    {
      points: 3,
      question: {
        question: 'What is the best Array?',
        type: 'checkBox',
        answerOptions: ['choice1e', 'choice32', 'choice2333', 'choic3e4']
      }
    },
    {
      points: 4,
      question: {
        question: 'What is the best Array?',
        type: 'paragraph',
        answerOptions: []
      }
    },
    {
      points: 5,
      question: {
        question: 'What is the best Array?',
        type: 'multipleChoice',
        answerOptions: ['choice1', 'choice2', 'choice3', 'choice4']
      }
    },
  ]
}

const ResultDetailPage = () => {
  const classes = useStyles()
  const redirect = useRedirect()

  return (
    <div className={classes.root}>
      <Paper className={classes.title}>
        <Typography
          variant='h3'
          className={classes.mainTitle}
        >
          {exam.title}
        </Typography>
        <Typography
          className={classes.desc}
          variant='h5'
        >
          {exam.description}
        </Typography>
        <Typography
          className={classes.time}
          variant='subtitle1'
        >
          TimeAllowed: {exam.timeAllowed}
        </Typography>
      </Paper>
      {
        exam.questions.map((question, index) => {
          return <Question key={index} question={question} index={index} />
        }
        )
      }
      <Notification />
    </div>
  )
}


export default ResultDetailPage

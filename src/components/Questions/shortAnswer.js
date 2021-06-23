/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardHeader,
  TextField
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    padding: '1em',
    position: 'relative',
    background: '#f9f9f9'
  },
  points: {
    position: 'absolute',
    top: '1em',
    right: '2em',
    color: '#ff7900',
    padding: '1em 2em',
    background: '#fff',
    border: '1px solid #000'
  },
  answerField: {
    width: '50%',
    background: '#fff'
  },
  header: {
    border: '.1px solid #000', padding: '1em',
    background: '#fff',
    fontSize: '1.1rem',
    width: '70%'
  }
})

const ShortAnswer = ({ question: { question, points, _id }, index, handleAnswer }) => {
  const classes = useStyles()
  const [answer, setAnswer] = useState('')

  return (
    <Card className={classes.root} elevation={0} tabIndex='0' onBlur={() => handleAnswer(answer, index, _id)}>
      <span className={classes.points}>
        {points} point
      </span>
      <CardHeader className={classes.header} title={question.question} />
      <CardContent>
        <TextField
          id="outlined-multiline-static"
          label="Answer here"
          multiline
          className={classes.answerField}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          variant="outlined"
        />
      </CardContent>
    </Card>
  )
}

ShortAnswer.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  handleAnswer: PropTypes.func
}

export default ShortAnswer

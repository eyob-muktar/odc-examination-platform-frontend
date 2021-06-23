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

const Paragraph = ({ question: { question, points, _id }, index, handleAnswer },) => {
  const classes = useStyles()
  const [answer, setAnswer] = useState('')

  return (
    <Card className={classes.root} elevation={0} tabIndex='0' onBlur={() => handleAnswer(answer, index, _id)}>
      <div className={classes.points}>
        {points} point
      </div>
      <div className={classes.header} dangerouslySetInnerHTML={{ __html: question.question }} />
      <CardContent>
        <TextField
          id="outlined-multiline-static"
          label="Answer here"
          multiline
          value={answer}
          rows={4}
          className={classes.answerField}
          variant="outlined"
          onChange={e => setAnswer(e.target.value)}
        />
      </CardContent>
    </Card>
  )
}

Paragraph.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  handleAnswer: PropTypes.func
}

export default Paragraph

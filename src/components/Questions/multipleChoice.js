/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
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
  header: {
    border: '.1px solid #000', padding: '1em',
    background: '#fff',
    fontSize: '1.1rem',
    width: '70%'
  }
})

const MultipleChoice = ({ question: { question, points, _id }, index, handleAnswer }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState('')

  const htmlDecode = (input) => {
    var e = document.createElement('div')
    e.innerHTML = input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  }

  return (
    <Card className={classes.root} elevation={0} tabIndex='0' onBlur={() => handleAnswer(selected, index, _id)}>
      <span className={classes.points}>
        {points} point
      </span>
      <CardHeader className={classes.header} title={question.question} />
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: question.question }} />
        <FormControl component="fieldset">
          <RadioGroup aria-label="choice" name="choice1" value={selected} onChange={(e) => setSelected(e.target.value)}>
            <FormControlLabel value={question.answerOptions[0]} control={<Radio />} label={question.answerOptions[0]} />
            <FormControlLabel value={question.answerOptions[2]} control={<Radio />} label={question.answerOptions[2]} />
            <FormControlLabel value={question.answerOptions[3]} control={<Radio />} label={question.answerOptions[3]} />
            <FormControlLabel value={question.answerOptions[1]} control={<Radio />} label={question.answerOptions[1]} />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card >
  )
}

MultipleChoice.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  handleAnswer: PropTypes.func
}

export default MultipleChoice

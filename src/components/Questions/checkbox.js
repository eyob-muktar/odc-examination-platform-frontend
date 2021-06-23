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
  Checkbox,
  FormControlLabel,
  FormGroup
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

const CheckBox = ({ question: { question, points, _id }, index, handleAnswer }) => {
  const classes = useStyles()
  const [choices, setChoices] = useState({
    choice1: false,
    choice2: false,
    choice3: false,
    choice4: false
  })

  const handleChange = (e) => {
    setChoices({ ...choices, [e.target.name]: e.target.checked })
  }

  const handleBlur = () => {
    const answer = []
    choices.choice1 ? answer.push(question.answerOptions[0]) : ''
    choices.choice2 ? answer.push(question.answerOptions[1]) : ''
    choices.choice3 ? answer.push(question.answerOptions[2]) : ''
    choices.choice4 ? answer.push(question.answerOptions[3]) : ''
    handleAnswer(answer, index, _id)
  }

  return (
    <Card className={classes.root} elevation={0} tabIndex='0' onBlur={handleBlur}>
      <span className={classes.points}>
        {points} point
      </span>
      <div className={classes.header} dangerouslySetInnerHTML={{ __html: question.question }} />
      <CardContent className={classes.contents}>

        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={choices.choice1} onChange={handleChange} name='choice1' />}
              label={question.answerOptions[0]} />
            <FormControlLabel
              control={<Checkbox checked={choices.choice2} onChange={handleChange} name='choice2' />}
              label={question.answerOptions[1]} />
            <FormControlLabel
              control={<Checkbox checked={choices.choice3} onChange={handleChange} name='choice3' />}
              label={question.answerOptions[2]} />
            <FormControlLabel
              control={<Checkbox checked={choices.choice4} onChange={handleChange} name='choice4' />}
              label={question.answerOptions[3]} />
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}

CheckBox.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  handleAnswer: PropTypes.func
}

export default CheckBox

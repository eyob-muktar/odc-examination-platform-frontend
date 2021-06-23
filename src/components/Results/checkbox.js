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
import ChangePoint from '../../resources/examinees/changePoint'

const useStyles = makeStyles({
  correct: {
    position: 'relative',
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#8AC481'
    },
    background: '#f9f9f9'

  },
  incorrect: {
    position: 'relative',
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#ff0000'
    },
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

const CheckBox = ({ question: { question, points }, correct, answerGiven, id, pointsGained }) => {
  const classes = useStyles()

  const handleChecked = (choice) => {
    let flag = false
    answerGiven.map(answer => {
      if (answer === choice) {
        flag = true
      }
    })
    return flag
  }

  return (
    <Card elevation={0} className={correct ? classes.correct : classes.incorrect} >
      <span className={classes.points}>
        {pointsGained}/{points}
        <ChangePoint max={points} id={id} />
      </span>
      <div className={classes.header} dangerouslySetInnerHTML={{ __html: question.question }} />
      <CardContent className={classes.contents}>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox className={classes.checked} checked={handleChecked(question.answerOptions[0])} name='choice1' />}
              label={question.answerOptions[0]} />
            <FormControlLabel
              control={<Checkbox className={classes.checked} checked={handleChecked(question.answerOptions[1])} name='choice2' />}
              label={question.answerOptions[1]} />
            <FormControlLabel
              control={<Checkbox checked={handleChecked(question.answerOptions[2])} name='choice3' />}
              label={question.answerOptions[2]} />
            <FormControlLabel
              control={<Checkbox checked={handleChecked(question.answerOptions[3])} name='choice4' />}
              label={question.answerOptions[3]} />
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}

CheckBox.propTypes = {
  question: PropTypes.object,
  correct: PropTypes.bool,
  answerGiven: PropTypes.array,
  id: PropTypes.string,
  pointsGained: PropTypes.number

}

export default CheckBox

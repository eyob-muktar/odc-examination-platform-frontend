import React from 'react'
import PropTypes from 'prop-types'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'
import ChangePoint from '../../resources/examinees/changePoint'

const useStyles = makeStyles({
  correct: {
    position: 'relative',
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: '#8AC481'
    },
    background: '#f9f9f9'

  },
  incorrect: {
    position: 'relative',
    '& .MuiRadio-colorSecondary.Mui-checked': {
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

const MultipleChoice = ({ question: { question, points }, correct, answerGiven, id, pointsGained }) => {
  const classes = useStyles()

  return (
    <Card className={correct ? classes.correct : classes.incorrect} >
      <span className={classes.points}>
        {pointsGained}/{points}
        <ChangePoint max={points} id={id} />
      </span>
      <div className={classes.header} dangerouslySetInnerHTML={{ __html: question.question }} />
      <CardContent>
        <FormControl component="fieldset">
          <RadioGroup aria-label="choice" name="choice1" value={answerGiven[0]} >
            <FormControlLabel value={question.answerOptions[0]} control={<Radio disabled />} label={question.answerOptions[0]} />
            <FormControlLabel value={question.answerOptions[2]} control={<Radio />} label={question.answerOptions[2]} />
            <FormControlLabel value={question.answerOptions[3]} control={<Radio />} label={question.answerOptions[3]} />
            <FormControlLabel value={question.answerOptions[1]} control={<Radio disabled />} label={question.answerOptions[1]} />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}

MultipleChoice.propTypes = {
  question: PropTypes.object,
  correct: PropTypes.bool,
  answerGiven: PropTypes.array,
  id: PropTypes.string,
  pointsGained: PropTypes.number
}

export default MultipleChoice

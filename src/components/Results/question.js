import React from 'react'
import PropTypes from 'prop-types'

//MUI
import { makeStyles } from '@material-ui/core/styles'

import MultipleChoice from './multipleChoice'
import ShortAnswer from './shortAnswer'
import Paragraph from './paragraph'
import CheckBox from './checkbox'

const useStyles = makeStyles({
  correct: {
    padding: '1em',
    margin: '1em'
  },
  incorrect: {
    padding: '1em',
    margin: '1em'
  }
})

const Question = ({ question, correct, answerGiven, pointsGained, id }) => {
  const classes = useStyles()
  return (
    <div className={question.correct ? classes.correct : classes.incorrect}>
      {
        question.question.type === 'multipleChoice'
        &&
        <MultipleChoice
          question={question}
          correct={correct}
          answerGiven={answerGiven}
          id={id}
          pointsGained={pointsGained}
        />
      }
      {
        question.question.type === 'shortAnswer'
        &&
        <ShortAnswer
          question={question}
          correct={correct}
          answerGiven={answerGiven}
          id={id}
          pointsGained={pointsGained}
        />
      }
      {
        question.question.type === 'paragraph'
        &&
        <Paragraph
          question={question}
          correct={correct}
          answerGiven={answerGiven}
          id={id}
          pointsGained={pointsGained}
        />
      }
      {
        question.question.type === 'checkBox'
        &&
        <CheckBox
          question={question}
          correct={correct}
          answerGiven={answerGiven}
          id={id}
          pointsGained={pointsGained}
        />
      }
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.object,
  correct: PropTypes.bool,
  answerGiven: PropTypes.array,
  id: PropTypes.string,
  pointsGained: PropTypes.number
}

export default Question

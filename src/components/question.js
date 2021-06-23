import React from 'react'
import PropTypes from 'prop-types'

//MUI
import { makeStyles } from '@material-ui/core/styles'

import MultipleChoice from './Questions/multipleChoice'
import ShortAnswer from './Questions/shortAnswer'
import Paragraph from './Questions/paragraph'
import CheckBox from './Questions/checkbox'

const useStyles = makeStyles({
  root: {
    margin: '2em 0',
    padding: '2em',
    '& .MuiTypography-h5 ': {
      fontSize: '1.1rem',
    }
  }
})
const Question = ({ question, index, handleAnswers }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {
        question.question.type === 'multipleChoice'
        &&
        <MultipleChoice
          question={question}
          index={index}
          handleAnswer={handleAnswers}
        />
      }
      {
        question.question.type === 'shortAnswer'
        &&
        <ShortAnswer
          question={question}
          index={index}
          handleAnswer={handleAnswers}
        />
      }
      {
        question.question.type === 'paragraph'
        &&
        <Paragraph
          question={question}
          index={index}
          handleAnswer={handleAnswers}
        />
      }
      {
        question.question.type === 'checkBox'
        &&
        <CheckBox
          question={question}
          index={index}
          handleAnswer={handleAnswers}
        />
      }
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  handleAnswers: PropTypes.func
}

export default Question

import React, { useState } from 'react'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  MenuItem,
  TextField,
  Card,
  CardContent,
  Paper,
} from '@material-ui/core'

import MultipleChoice from './Questions/anotherQuestion'
import ShortAnswer from './Questions/shortAnswer'

const useStyles = makeStyles({
  root: {
    margin: '2em 0',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  },
  settings: {
    width: '50%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    margin: '1em'
  }
})

const Question = () => {
  const [questionContent, setQuestionContent] = useState('')
  const [choices, setChoices] = useState([])
  const [answer, setAnswer] = useState('')
  const [questionType, setQuestionType] = useState('multipleChoice')
  const [mark, setMark] = useState(1)
  const classes = useStyles()


  const handleChange = (question, choices, answer) => {
    console.log(question)
    setQuestionContent(question)
    setChoices(choices)
    setAnswer(answer)
  }

  console.log(questionContent, choices, answer)
  return (
    <div className={classes.root}>
      <Card>
        <CardContent
          tabIndex="0"
          onFocus={console.log('focus')}
          onBlur={console.log('blur')}
        >
          {
            questionType === 'multipleChoice'
            &&
            <MultipleChoice
              handleChange={handleChange}
            />
          }{
            questionType === 'shortAnswer'
            &&
            <ShortAnswer />
          }
        </CardContent>
      </Card>
      <Paper className={classes.settings}>
        <form noValidate autoComplete='off' className={classes.form}>
          <TextField
            select
            label='Question Type'
            value={questionType}
            onChange={e => setQuestionType(e.target.value)}
            className={classes.textField}
          >
            <MenuItem key='multipleChoice' value='multipleChoice'>Multiple Choice</MenuItem>
            <MenuItem key='shortAnswer' value='shortAnswer'>Short Answer</MenuItem>
            <MenuItem key='fillIn' value='fillIn'>Fill in the blank</MenuItem>
            <MenuItem key='code' value='code'>Code</MenuItem>
          </TextField>
          <TextField
            label='Mark'
            value={mark}
            type='number'
            name='mark'
            onChange={e => setMark(e.target.value)}
            className={classes.textField}
          />
        </form>
      </Paper>
    </div>
  )
}

export default Question

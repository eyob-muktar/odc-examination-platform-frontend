import React, { useState } from 'react'
import PropTypes from 'prop-types'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  MenuItem,
  TextField,
  Paper,
  // Divider,
  Checkbox,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
  Input,
  Typography
} from '@material-ui/core'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ShortTextIcon from '@material-ui/icons/ShortText'
import SubjectIcon from '@material-ui/icons/Subject'


import Editor from './editor'


const useStyles = makeStyles({
  root: {
    margin: '2em 0',
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  questionContainer: {
    marginTop: '1em',
    marginBottom: '2em',
    padding: '1em 2em',
    width: '80%',
    background: '#f9f9f9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  choiceField: {
    margin: '0 2em',
    width: '50%',
    '& .MuiInput-underline:before': {
      borderBottom: '0px'
    }
  },

  answerContainer: {
    marginTop: '1em',
    marginBottom: '2em',
    padding: '1em 1em',
    background: '#f9f9f9'
  },
  answerField: {
    width: '50%'
  },
  formControl: {
    minWidth: '120px',
    maxWidth: '300px'
  },
  types: {
    display: 'flex',
    direction: 'row',
    width: '100%'
  },
  type: {
    color: '#707070',
    width: '24%',
    margin: '1em',
    padding: '2em 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '4px',
    border: '1px solid #707070'
  },
  active: {
    color: '#ff7900',
    width: '24%',
    margin: '1em',
    padding: '2em 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '4px',
    border: '1px solid #707070'
  }
})


const QuestionForm = ({ handleQuestions, number }) => {
  const [questionContent, setQuestionContent] = useState('Question')
  const [choices, setChoices] = useState({
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4'
  })
  const [answer, setAnswer] = useState([])
  const [paraAnswer, setParaAnswer] = useState('')
  const [questionType, setQuestionType] = useState('multipleChoice')
  const [points, setPoints] = useState(1)
  const classes = useStyles()

  const handleClick = () => {
    handleQuestions({
      question: {
        question: questionContent,
        answerOptions: questionType === ('multipleChoice' || 'checkBox') ? Object.values(choices) : [],
        correctAnswers: questionType === 'paragraph' ? paraAnswer.split(',') : answer,
        type: questionType
      },
      points
    }, number)
  }

  const handleChoices = ({ currentTarget: { name, value } }) => {
    setChoices((state) => ({ ...state, [name]: value }))
  }

  return (
    <Paper className={classes.root} elevation={0} tabIndex='0' onBlur={handleClick}  >
      <Typography variant='h6'>
        Select question type
      </Typography>
      <div className={classes.types}>

        <div className={questionType === 'multipleChoice' ? classes.active : classes.type} onClick={() => setQuestionType('multipleChoice')}>
          <RadioButtonCheckedIcon fontSize='small' />
          <RadioButtonUncheckedIcon fontSize='small' />
          <Typography variant='overline'>
            Multiple Choice
          </Typography>
        </div>
        <div className={questionType === 'checkBox' ? classes.active : classes.type} onClick={() => setQuestionType('checkBox')}>
          <CheckBoxIcon fontSize='small' />
          <CheckBoxOutlineBlankIcon fontSize='small' />
          <Typography variant='overline'>
            Check Box
          </Typography>
        </div>
        <div className={questionType === 'shortAnswer' ? classes.active : classes.type} onClick={() => setQuestionType('shortAnswer')}>
          <ShortTextIcon fontSize='small' />
          <Typography variant='overline'>
            Short Answer
          </Typography>
        </div>
        <div className={questionType === 'paragraph' ? classes.active : classes.type} onClick={() => setQuestionType('paragraph')}>
          <SubjectIcon fontSize='small' />
          <Typography variant='overline'>
            Paragraph
          </Typography>
        </div>
      </div>
      <Typography variant='h6' >
        Question
      </Typography>
      <div className={classes.questionContainer}>

        <Editor setValue={setQuestionContent} value={questionContent} />
        {questionType === 'multipleChoice'
          &&
          <form>
            <TextField
              className={classes.choiceField}
              value={choices.choice1}
              id='choice1'
              placeholder='Choice1'
              onChange={handleChoices}
              name='choice1'
              multiline
            />
            <TextField
              className={classes.choiceField}
              value={choices.choice2}
              placeholder='Choice 2'
              id='choice2'
              onChange={handleChoices}
              name='choice2'
              multiline
            />
            <TextField
              className={classes.choiceField}
              value={choices.choice3}
              id='choice3'
              placeholder='Choice3'
              onChange={handleChoices}
              name='choice3'
              multiline
            />
            <TextField
              className={classes.choiceField}
              value={choices.choice4}
              id='choice4'
              placeholder='Choice4'
              onChange={handleChoices}
              name='choice4'
              multiline
            />
          </form>
        }
        {questionType === 'checkBox'
          &&
          <form>
            <TextField
              className={classes.choiceField}
              value={choices.choice1}
              id='choice1'
              placeholder='Choice1'
              onChange={handleChoices}
              name='choice1'
              multiline
            />
            <TextField
              className={classes.choiceField}
              value={choices.choice2}
              placeholder='Choice 2'
              id='choice2'
              onChange={handleChoices}
              name='choice2'
              multiline
            />
            <TextField
              className={classes.choiceField}
              value={choices.choice3}
              id='choice3'
              placeholder='Choice3'
              onChange={handleChoices}
              name='choice3'
              multiline
            />
            <TextField
              className={classes.choiceField}
              value={choices.choice4}
              id='choice4'
              placeholder='Choice4'
              onChange={handleChoices}
              name='choice4'
              multiline
            />
          </form>
        }
      </div>
      <Typography variant='h6'>
        Answers
      </Typography>
      <div className={classes.answerContainer}>

        {
          questionType === 'multipleChoice'
          &&
          <TextField
            select
            label='Answer'
            value={answer}
            onChange={e => setAnswer([e.target.value])}
            className={classes.answerField}
          >
            <MenuItem key='choice1' value={choices.choice1}>{choices.choice1}</MenuItem>
            <MenuItem key='choice2' value={choices.choice2}>{choices.choice2}</MenuItem>
            <MenuItem key='choice3' value={choices.choice3}>{choices.choice3}</MenuItem>
            <MenuItem key='choice4' value={choices.choice4}>{choices.choice4}</MenuItem>
          </TextField>
        }
        {
          questionType === 'checkBox'
          &&
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Answer</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem key={choices.choice1} value={choices.choice1}>
                <Checkbox checked={answer.indexOf(choices.choice1) > -1} />
                <ListItemText primary={choices.choice1} />
              </MenuItem>
              <MenuItem key={choices.choice2} value={choices.choice2}>
                <Checkbox checked={answer.indexOf(choices.choice2) > -1} />
                <ListItemText primary={choices.choice2} />
              </MenuItem>
              <MenuItem key={choices.choice3} value={choices.choice3}>
                <Checkbox checked={answer.indexOf(choices.choice3) > -1} />
                <ListItemText primary={choices.choice3} />
              </MenuItem>
              <MenuItem key={choices.choice4} value={choices.choice4}>
                <Checkbox checked={answer.indexOf(choices.choice4) > -1} />
                <ListItemText primary={choices.choice4} />
              </MenuItem>

            </Select>
          </FormControl>
        }
        {
          questionType === 'paragraph'
          &&
          <TextField
            className={classes.answerField}
            value={paraAnswer}
            id='answer'
            label='Expected Keywords'
            onChange={e => setParaAnswer(e.target.value)}
            name='answer'
            multiline
            helperText='Enter the keywords by separating them with a comma'
          />
        }
        {
          questionType === 'shortAnswer'
          &&
          <TextField
            className={classes.answerField}
            value={answer}
            id='answer'
            label='Answer'
            onChange={e => setAnswer([e.target.value])}
            name='answer'
            multiline
          />
        }
        {
          questionType === 'code'
          &&
          <TextField
            className={classes.answerField}
            value={answer}
            id='answer'
            label='Expected Output'
            onChange={e => setAnswer([e.target.value])}
            name='answer'
            multiline
          />
        }

      </div>


      <TextField
        label='Points'
        value={points}
        type='number'
        name='points'
        onChange={e => setPoints(e.target.value)}
        className={classes.pointField}
      />
    </Paper>
  )
}

QuestionForm.propTypes = {
  handleQuestions: PropTypes.func,
  number: PropTypes.number
}

export default QuestionForm

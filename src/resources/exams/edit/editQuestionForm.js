/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory, useParams } from 'react-router-dom'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  MenuItem,
  TextField,
  // Divider,
  Checkbox,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
  Input,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress
} from '@material-ui/core'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ShortTextIcon from '@material-ui/icons/ShortText'
import SubjectIcon from '@material-ui/icons/Subject'


import Editor from '../../../components/Questions/editor'
import { useDispatch, useSelector } from 'react-redux'
import { useNotify, useRefresh } from 'ra-core'
import { useRedirect, useUpdate } from 'react-admin'


const useStyles = makeStyles({
  root: {
    margin: '2em 0',
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    background: '#fff'
  },
  backBtn: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: '#ff7900',
    color: '#fff'
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
    background: '#fff',
    marginBottom: '2em',
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
  },
  pointField: {
    width: 'fit-content'
  },
  selectedContainer: {
    display: 'flex',
    justifyContent: 'center',
    color: '#ff7900'
  },
  selectedText: {
    textAlign: 'center'
  },
  btn: {
    color: '#fff',
    background: '#ff7900',
    width: 'fit-content',
    marginTop: '2em'
  }
})

const EditQuestionForm = () => {
  const { id } = useParams()
  console.log(id)
  const questions = useSelector(state => state.Questions)
  console.log(questions)

  const questionWrapper = questions ? questions[0].find((question) => {
    return question.question._id === id
  }) : ''
  const { question, points } = questionWrapper
  const [questionContent, setQuestionContent] = useState(question.question)
  const [choices, setChoices] = useState({
    choice1: question.answerOptions[1],
    choice2: question.answerOptions[2],
    choice3: question.answerOptions[3],
    choice4: question.answerOptions[4]
  })
  const [answer, setAnswer] = useState(question.correctAnswers)
  const [paraAnswer, setParaAnswer] = useState('')
  const [questionType, setQuestionType] = useState(question.type)
  const [editedPoints, setPoints] = useState(points)
  const notify = useNotify()
  const redirect = useRedirect()
  const refresh = useRefresh()
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [update, { loading }] = useUpdate(
    'questions',
    id,
    {
      question: questionContent,
      answerOptions: questionType === ('multipleChoice' || 'checkBox') ? Object.values(choices) : [],
      correctAnswers: questionType === 'paragraph' ? paraAnswer.split(',') : answer,
      type: questionType

    },
    {
      question: question.question,
      answerOptions: questions.answerOptions,
      correctAnswers: questions.correctAnswers,
      type: question.type
    },
    {
      onSuccess: () => {
        notify('Question Updated Successfully', 'info')
        history.goBack()
        refresh()
      },
      onFailure: (error) => {
        error.body.error ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
      }
    }
  )

  const handleSubmit = () => {
    dispatch({
      type: 'SET_EDITED_QUESTIONS',
      payload: {
        question: {
          question: questionContent,
          answerOptions: questionType === ('multipleChoice' || 'checkBox') ? Object.values(choices) : [],
          correctAnswers: questionType === 'paragraph' ? paraAnswer.split(',') : answer,
          type: questionType
        },
        editedPoints
      }
    })
    notify('Question Edited successfully', 'info')
    history.goBack()
  }

  const handleChoices = ({ currentTarget: { name, value } }) => {
    setChoices((state) => ({ ...state, [name]: value }))
  }

  const testChecked = (value) => {
    return answer.includes(value)
  }

  const handleChange = (e) => {
    const index = answer.indexOf(e.target.value)

    answer.includes(e.target.value) ? setAnswer(prevState => {
      return prevState.filter(item => item !== e.target.value)
    }) : setAnswer(prevState => [...prevState, e.target.value])

    console.log(answer)
  }

  return (
    <div className={classes.root} elevation={0} tabIndex='0'  >
      <Button
        variant='contained'
        className={classes.backBtn}
        component={Link}
        to='/add-questions'
      >
        Back To Exam
      </Button>
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
      </div>
      <Typography variant='h6'>
        Answers
      </Typography>
      <div className={classes.answerContainer}>
        {questionType === 'multipleChoice'
          &&
          <form>
            <div className={classes.choices}>
              <RadioGroup aria-label="answer" name="customized-radios" onChange={(e) => setAnswer([e.target.value])}>
                <FormControlLabel value={choices.choice1} control={<Radio />} label='(A). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice1}
                  id='choice1'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice1'
                  multiline
                />
                <FormControlLabel value={choices.choice2} control={<Radio />} label='(B). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice2}
                  id='choice2'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice2'
                  multiline
                />

                <FormControlLabel value={choices.choice3} control={<Radio />} label='(C). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice3}
                  id='choice3'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice3'
                  multiline
                />
                <FormControlLabel value={choices.choice4} control={<Radio />} label='(D). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice4}
                  id='choice4'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice4'
                  multiline
                />
              </RadioGroup>
            </div>
          </form>
        }
        {questionType === 'checkBox'
          &&
          <form>
            <div className={classes.choices}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormControlLabel control={<Checkbox value={choices.choice1} checked={testChecked(choices.choice1)} onChange={(e) => handleChange(e)} name='choice1' />} label='(A). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice1}
                  id='choice1'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice1'
                  multiline
                />
                <FormControlLabel control={<Checkbox value={choices.choice2} checked={testChecked(choices.choice2)} onChange={(e) => handleChange(e)} name='choice2' />} label='(A). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice2}
                  id='choice2'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice2'
                  multiline
                />

                <FormControlLabel control={<Checkbox value={choices.choice3} checked={testChecked(choices.choice3)} onChange={(e) => handleChange(e)} name='choice3' />} label='(A). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice3}
                  id='choice3'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice3'
                  multiline
                />
                <FormControlLabel control={<Checkbox value={choices.choice4} checked={testChecked(choices.choice4)} onChange={(e) => handleChange(e)} name='choice4' />} label='(A). This option is the correct answer' />
                <TextField
                  className={classes.choiceField}
                  value={choices.choice4}
                  id='choice4'
                  rows={4}
                  variant='outlined'
                  placeholder='Choice1'
                  onChange={handleChoices}
                  name='choice4'
                  multiline
                />
              </FormControl>
            </div>
          </form>
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
      </div>
      <div className={classes.selectedContainer}>
        <Typography variant='overline' className={classes.selectedText}>
          Selected Correct Answer Is: <br />
          {answer}
        </Typography>
      </div>
      <TextField
        label='Points'
        value={editedPoints}
        type='number'
        name='points'
        onChange={e => setPoints(e.target.value)}
        className={classes.pointField}
      />
      <Button
        onClick={update}
        className={classes.btn}
        variant='contained'

      >
        Save
        {
          loading &&
          <CircularProgress size={20} className={classes.progress} />
        }
      </Button>
    </div>
  )
}

EditQuestionForm.propTypes = {
  question: PropTypes.object,
}

export default EditQuestionForm

/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

import Question from '../../../components/Results/question'
// import { useCreate, useNotify, useRedirect } from 'ra-core'
import { Error, Loading, useQueryWithStore } from 'react-admin'

const useStyles = makeStyles({
  root: {
    '& table': {
      border: '1px'
    },
    background: '#fff'
  },
  header: {
    display: 'flex',
    margin: '2em',
    justifyContent: 'space-between'
  },
  btn: {
    background: '#ff7900',
    color: '#fff',
  },
  questionContainer: {
    background: '#f9f9f9'
  },
  editBtn: {
    marginLeft: '2em',
    marginBottom: '2em',
  }
})

const EditQuestions = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  // const notify = useNotify()
  // const redirect = useRedirect()
  // const questions = useSelector(state => state.Questions)
  // const examInfo = useSelector(state => state.examInfo)

  const { error, data, loading, loaded } = useQueryWithStore({
    type: 'getOne',
    resource: 'exams',
    payload: { id: `${id}/include-questions` }
  })

  if (loaded) {
    console.log(data.questions)
    dispatch({
      type: 'SET_QUESTIONS',
      payload: data.questions
    })
  }
  if (loading) { return <Loading /> }
  if (error) { return error.body ? <Error error={error.body.error} /> : <Error error={'Network Problem! Please Try Again'} /> }

  // const [create, { loading }] = useCreate(
  //   'exams',
  //   {
  //     title: examInfo?.title || 'Untitled',
  //     description: examInfo?.desc || 'description',
  //     questions,
  //     timeAllowed: 90
  //   },
  //   {
  //     onSuccess: () => {
  //       notify('Exam Created Successfully', 'info')
  //       redirect('/exams')
  //     },
  //     onFailure: (error) => {
  //       error.body.error ? notify(error.body.error, 'warning') : notify('Something went wrong! try again', 'warning')
  //     }
  //   }
  // )

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant='h5' >
          {data.title ? data.title : 'Untitled Exam'} Questions
        </Typography>
        <Button
          className={classes.btn}
          startIcon={<AddIcon />}
          variant='contained'
          component={Link}
          to='/edit-question'
        >
          Add Questions
        </Button>
      </div>
      <Typography variant='body'>
        The exam have {data.questions.length} questions
      </Typography>
      <div className={classes.questions}>
        {
          data.questions?.map((question, index) => {
            return (
              <div className={classes.questionContainer} key={index}>
                <Question
                  question={question}
                  correct={true}
                  answerGiven={question.question.correctAnswers}
                />
                <Button
                  startIcon={<EditIcon />}
                  variant='outlined'
                  color='primary'
                  component={Link}
                  to={'/edit-question/' + question.question._id}
                  className={classes.editBtn}
                >
                  Edit
                </Button>

              </div>
            )
          })
        }
      </div>
      <Button
        variant='contained'
        className={classes.btn}
        disabled={!data.questions.length}
      // onClick={create}
      >
        submit
        {
          loading
          &&
          <CircularProgress size={20} className={classes.btn} />
        }
      </Button>
    </div>
  )
}

export default EditQuestions

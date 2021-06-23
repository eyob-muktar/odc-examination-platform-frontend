import React, { useState } from 'react'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useRedirect } from 'ra-core'

const useStyles = makeStyles({
  root: {
    background: 'url(/images/edit-exam-bg.png)',
    backgroundSize: 'cover'
  },
  form: {
    height: '100vh',
    width: '40%',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  mainTitle: {
    marginBottom: '1em',
    '& .MuiInputBase-root': {
      fontSize: '5rem',
      color: '#ff7900',
      fontWeight: 'bolder'
    },
    '& .MuiInput-underline:before': {
      borderBottom: '0px'
    },
  },
  desc: {
    '& .MuiInput-underline:before': {
      borderBottom: '0px'
    },
    '& .MuiInputBase-root': {
      fontSize: '2rem'
    }
  },
  btn: {
    color: '#fff',
    background: '#ff7900',
    width: 'fit-content'
  }
})

const ExamDetail = () => {
  const classes = useStyles()
  const [title, setTitle] = useState('Exam Title')
  const [desc, setDesc] = useState('Some description ...')
  const dispatch = useDispatch()
  const redirect = useRedirect()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch({
      type: 'SET_EXAM_INFO',
      payload: {
        title,
        desc
      }
    })
    redirect('/create')
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <form onSubmit={e => handleClick(e)} className={classes.form}>
          <TextField
            className={classes.mainTitle}
            value={title}
            placeholder='Exam Title'
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className={classes.desc}
            value={desc}
            placeholder='Description'
            onChange={e => setDesc(e.target.value)}
            multiline
            required
            rows={3}
          />
          <Button
            className={classes.btn}
            variant='contained'
            type='submit'
          >
            Add Questions
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ExamDetail

import React from 'react'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core'
import TimeIcon from '@material-ui/icons/HourglassEmpty'
import PointIcon from '@material-ui/icons/Score'
import NumberIcon from '@material-ui/icons/QuestionAnswer'

const useStyles = makeStyles({
  root: {
    padding: '3em',
    textAlign: 'center',
    color: '#ff7900'
  },
  title: {
    fontSize: '2rem'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  actionArea: {
    display: 'flex',
    justifyContent: 'center'
  }
})


const ExamInfoPage = () => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title='Exams Title' className={classes.title}>
      </CardHeader>
      <CardContent className={classes.content}>
        <div className={classes.contentBody}>
          <TimeIcon />
          <Typography variant='overline'>
          2 Hrs.
          </Typography>
        </div>
        <div className={classes.contentBody}>
          <NumberIcon />
          <Typography variant='overline'>
          15 Questions
          </Typography>
        </div>
        <div className={classes.contentBody}>
          <PointIcon />
          <Typography variant='overline'>
          30 Points
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.actionArea} >
        <Button className={classes.btn} variant='outlined'>
          Procced to exam
        </Button>
      </CardActions>
    </Card>
  )
}

export default ExamInfoPage

import React from 'react'
import PropTypes from 'prop-types'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core'
import ChangePoint from '../../resources/examinees/changePoint'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: '#f9f9f9'
  },
  correct: {
    padding: '1em',
    position: 'relative',
    background: '#8AC481'
  },
  incorrect: {
    position: 'relative',
    background: '#ff0000'
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
  answerField: {
    width: '50%',
    background: '#fff'
  },
  header: {
    border: '.1px solid #000', padding: '1em',
    background: '#fff',
    fontSize: '1.1rem',
    width: '70%'
  }
})

const Paragraph = ({ question: { question, points }, correct, answerGiven, id, pointsGained }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} >
      <span className={classes.points}>
        {points}/{pointsGained}
        <ChangePoint max={points} id={id} />
      </span>
      <div className={classes.header} dangerouslySetInnerHTML={{ __html: question.question }} />
      <CardContent className={correct ? classes.correct : classes.incorrect}>
        <Typography variant='h6'>
          {answerGiven[0]}
        </Typography>
      </CardContent>
    </Card>
  )
}

Paragraph.propTypes = {
  question: PropTypes.object,
  correct: PropTypes.bool,
  answerGiven: PropTypes.array,
  id: PropTypes.string,
  pointsGained: PropTypes.number

}

export default Paragraph

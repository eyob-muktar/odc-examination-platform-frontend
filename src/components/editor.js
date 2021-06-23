import React from 'react'
import PropTypes from 'prop-types'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/mode/php/php'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    background: '#555',
    color: '#fff'
  }
})

const Editor = ({ language, onChange, value }) => {
  const classes = useStyles()
  const handleChange = (editor, data, value) => {
    onChange(value)
  }
  return (
    <div className={classes.root}>
      {language}
      <CodeMirror
        onBeforeChange={handleChange}
        value={value}
        className={classes.codeMirror}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }} />
    </div>
  )
}

Editor.propTypes = {
  language: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default Editor

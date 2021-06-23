import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// MUI
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  editor: {
    marginBottom: '2em'
  }
})

// eslint-disable-next-line react/prop-types
const Editor = ({ value, setValue }) => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.editor}>
        <CKEditor
          editor={ClassicEditor}
          data={value}

          onChange={(event, editor) => {
            const data = editor.getData()
            setValue(data)
            console.log(value)
          }}
        />
      </div>
    </div>
  )
}

export default Editor

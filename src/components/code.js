import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  frame: {
    width: '600px',
    height: '500px'
  }
})

const Code = () => {
  const classes = useStyles()
  return (
    <div>
      <iframe
        src="https://codesandbox.io/embed/new?codemirror=1"
        className={classes.frame}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>     
    </div>
  )
}

export default Code

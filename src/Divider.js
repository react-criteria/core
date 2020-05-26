import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTheme } from './Theme'

const useStyles = createUseStyles({
  root: theme => ({
    height: '1px',
    border: 'none',
    margin: '1em 0',
    backgroundColor: theme.container.borderColor
  })
})

function Divider () {
  const classes = useStyles(useTheme())

  return (
    <hr className={classes.root} />
  )
}

export default React.memo(Divider)

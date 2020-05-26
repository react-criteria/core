import React from 'react'
import useDOMID from 'use-dom-id'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { useTheme } from '../../src'

const useStyles = createUseStyles({
  rootGutterBottom: {
    marginBottom: '1em'
  },

  field: theme => ({
    width: '100%',
    padding: '1em',
    fontSize: '1em',
    color: 'inherit',
    borderRadius: '2px',
    backgroundColor: 'transparent',
    border: `solid 1px ${theme.container.borderColor}`
  }),

  label: {
    display: 'block',
    marginBottom: '.5em'
  }
})

Textfield.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  gutterBottom: PropTypes.bool
}

function Textfield (props) {
  const {
    value,
    label,
    type = 'text',
    gutterBottom = false,
    onChange: onChangeProp,
    ...otherProps
  } = props

  const id = useDOMID('textfield')
  const classes = useStyles(useTheme())

  const onChange = React.useCallback(ev => {
    if (typeof onChangeProp !== 'function') return
    onChangeProp(ev.target.value)
  }, [onChangeProp])

  const rootElementClassName = React.useMemo(() => {
    const classNames = []

    if (gutterBottom === true) classNames.push(classes.rootGutterBottom)

    return classNames.join(' ')
  }, [classes, gutterBottom])

  return (
    <div className={rootElementClassName}>
      {
        label != null && (
          <label
            htmlFor={id}
            className={classes.label}>{label}</label>
        )
      }

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={classes.field}
        {...otherProps} />
    </div>
  )
}

export default React.memo(Textfield)

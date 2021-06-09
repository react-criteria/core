import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

import { useTheme } from './Theme'
import useID from './hooks/useID'

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
    '-webkit-appearance': 'none',
    border: `solid 1px ${theme.container.borderColor}`
  }),

  label: {
    display: 'block',
    marginBottom: '.5em'
  }
})

Select.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  gutterBottom: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  )
}

function Select (props) {
  const {
    value,
    label,
    options = [],
    gutterBottom = false,
    onChange: onChangeProp,
    ...otherProps
  } = props

  const id = useID()
  const classes = useStyles(useTheme())

  const onChange = React.useCallback(ev => {
    if (typeof onChangeProp !== 'function') return
    onChangeProp(ev.target.value)
  }, [onChangeProp])

  const optionsDOM = React.useMemo(() => {
    return options.map(option => {
      return (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      )
    })
  }, [options])

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
            className={classes.label}
          >
            {label}
          </label>
        )
      }

      <select
        id={id}
        value={value}
        onChange={onChange}
        className={classes.field}
        {...otherProps}
      >
        {optionsDOM}
      </select>
    </div>
  )
}

export default React.memo(Select)

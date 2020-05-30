import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from './Theme'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: theme => ({
    height: '36px',
    fontSize: '1em',
    minWidth: '64px',
    cursor: 'pointer',
    borderRadius: '2px',
    transitionDuration: '.2s',
    textTransform: 'uppercase',
    color: theme.button.defaultColor,
    transitionProperty: 'background-color',
    border: `solid 1px ${theme.container.borderColor}`,
    backgroundColor: theme.button.defaultBackgroundColor,

    '&:disabled': {
      color: theme.button.disabledColor,
      backgroundColor: theme.button.disabledBackgroundColor
    }
  }),

  rootDefaultVariant: theme => ({
    '&:focus, &:hover': {
      backgroundColor: theme.button.defaultHoverBackgroundColor
    }
  }),

  rootPrimaryVariant: theme => ({
    border: 'none',
    color: theme.button.primaryColor,
    backgroundColor: theme.palette.primary
  }),

  rootSecondaryVariant: theme => ({
    border: 'none',
    color: theme.button.secondaryColor,
    backgroundColor: theme.palette.secondary
  }),

  rootMaxWidth: {
    width: '100%'
  }
})

Button.propTypes = {
  maxWidth: PropTypes.bool,
  children: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary'])
}

function Button (props) {
  const {
    variant,
    maxWidth = true
  } = props

  const classes = useStyles(useTheme())

  const rootElementClassName = React.useMemo(() => {
    const className = [classes.root]

    if (maxWidth === true) className.push(classes.rootMaxWidth)

    switch (variant) {
      case 'primary': className.push(classes.rootPrimaryVariant); break
      case 'secondary': className.push(classes.rootSecondaryVariant); break
      default: className.push(classes.rootDefaultVariant); break
    }

    return className.join(' ')
  }, [classes, maxWidth, variant])

  return (
    <button
      className={rootElementClassName}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default React.memo(Button)

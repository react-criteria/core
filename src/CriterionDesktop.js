import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { useTheme } from './Theme'
import Popover from './Popover'
import Criterion from './Criterion'
import useI18nLabel from './hooks/useI18nLabel'
import useCriterionSummaryValue from './hooks/useCriterionSummaryValue'

const useStyles = createUseStyles({
  root: theme => ({
    display: 'flex',
    flexShrink: '0',
    minWidth: '64px',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '7px 8px',
    borderRadius: '2px',
    outlineOffset: '-4px',
    transitionDuration: '.2s',
    backgroundColor: 'transparent',
    border: `solid 1px ${theme.container.borderColor}`,
    transitionProperty: 'background-color, border, borderColor',

    '&:not(:first-child)': {
      marginLeft: '10px'
    },

    '&:focus, &:hover': {
      backgroundColor: theme.button.defaultHoverBackgroundColor
    }
  }),

  rootDisabled: theme => ({
    borderColor: 'transparent',
    color: theme.button.disabledColor,
    backgroundColor: theme.button.disabledBackgroundColor
  }),

  rootActive: theme => ({
    color: theme.button.primaryColor,
    backgroundColor: theme.palette.primary,
    border: `solid 1px ${theme.palette.primary}`,

    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary
    }
  }),

  label: theme => ({
    padding: '2px 8px',
    borderRight: `solid 1px ${theme.container.borderColor}`
  }),

  value: {
    fontWeight: 'bold',
    padding: '2px 8px'
  }
})

CriterionDesktop.propTypes = {
  active: PropTypes.bool,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onActiveChange: PropTypes.func,
  criterionInfo: PropTypes.shape({
    value: PropTypes.func,
    label: PropTypes.string,
    component: PropTypes.shape({
      props: PropTypes.object,
      component: PropTypes.elementType
    }).isRequired
  })
}

function CriterionDesktop (props) {
  const {
    value,
    criterionInfo,
    active = false,
    disabled = false,
    onChange: onChangeProp,
    onDelete: onDeleteProp,
    onActiveChange: onActiveChangeProp
  } = props

  const classes = useStyles(useTheme())
  const rootElementRef = React.useRef(null)
  const summaryValue = useCriterionSummaryValue(criterionInfo.value, value)

  const i18nPopoverTitle = useI18nLabel(
    'criteria.criterion-title',
    criterionInfo.label
  )

  const i18nPopoverDesc = useI18nLabel(
    'criteria.criterion-description',
    criterionInfo.label
  )

  const onActiveChange = React.useCallback(newActiveState => {
    if (typeof onActiveChangeProp !== 'function') return
    onActiveChangeProp(newActiveState)
  }, [onActiveChangeProp])

  const toggleActiveState = React.useCallback(() => {
    onActiveChange(!active)
  }, [active, onActiveChange])

  const onDelete = React.useCallback(() => {
    if (typeof onDeleteProp === 'function') onDeleteProp()
    onActiveChange(false)
  }, [onDeleteProp, onActiveChange])

  const onChange = React.useCallback(updatedCriterion => {
    if (typeof onChangeProp === 'function') onChangeProp(updatedCriterion)
    onActiveChange(false)
  }, [onChangeProp, onActiveChange])

  const onPopoverClose = React.useCallback(() => {
    onActiveChange(false)
  }, [onActiveChange])

  const onKeyDown = React.useCallback(ev => {
    // Key: ENTER
    if (ev.keyCode === 13) toggleActiveState()
  }, [toggleActiveState])

  const rootElementClassName = React.useMemo(() => {
    const classNames = [classes.root]

    if (disabled === true) {
      classNames.push(classes.rootDisabled)
    } else if (active === true) {
      classNames.push(classes.rootActive)
    }

    return classNames.join(' ')
  }, [classes, disabled, active])

  function getOffset () {
    if (rootElementRef.current == null) return null

    const info = rootElementRef.current.getBoundingClientRect()

    return {
      x: info.left,
      y: info.top + 60
    }
  }

  const offset = getOffset()

  return (
    <>
      <div
        tabIndex='0'
        role='button'
        ref={rootElementRef}
        aria-expanded={active}
        aria-disabled={disabled}
        className={rootElementClassName}
        onKeyDown={onKeyDown}
        onClick={toggleActiveState}
      >
        <span className={classes.label}>{criterionInfo.label}</span>
        <span className={classes.value}>{summaryValue}</span>
      </div>

      {
        active === true && (
          <Popover
            top={offset.y}
            left={offset.x}
            onClose={onPopoverClose}
            title={i18nPopoverTitle}
            description={i18nPopoverDesc}
          >
            <Criterion
              value={value}
              onChange={onChange}
              onDelete={onDelete}
              onCancel={onPopoverClose}
              criterionInfo={criterionInfo}
            />
          </Popover>
        )
      }
    </>
  )
}

export default React.memo(CriterionDesktop)

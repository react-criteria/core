import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Popover from './Popover'
import AddCriterion from './AddCriterion'
import useI18nLabel from './hooks/useI18nLabel'

AddCriterionDesktop.propTypes = {
  onAdd: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  criteria: PropTypes.object,
  onActiveChange: PropTypes.func
}

function AddCriterionDesktop (props) {
  const {
    criteria = {},
    active = false,
    disabled = false,
    onAdd: onAddProp,
    onActiveChange: onActiveChangeProp
  } = props

  const rootElementRef = React.useRef(null)

  const i18nAdd = useI18nLabel('criteria.add-criterion-add')
  const i18nAddPopoverTitle = useI18nLabel('criteria.add-criterion-title')
  const i18nAddPopoverDesc = useI18nLabel('criteria.add-criterion-description')

  const onActiveChange = React.useCallback(newState => {
    if (typeof onActiveChangeProp !== 'function') return
    onActiveChangeProp(newState)
  }, [onActiveChangeProp])

  const toggleActiveState = React.useCallback(() => {
    onActiveChange(!active)
  }, [active, onActiveChange])

  const onPopoverClose = React.useCallback(() => {
    onActiveChange(false)
  }, [onActiveChange])

  const onAdd = React.useCallback(newCriterion => {
    if (typeof onAddProp === 'function') onAddProp(newCriterion)
    onActiveChange(false)
  }, [onAddProp, onActiveChange])

  function getOffset () {
    if (rootElementRef.current == null) return null

    const info = rootElementRef.current.getBoundingClientRect()

    return {
      x: info.right,
      y: info.top + 60
    }
  }

  const offset = getOffset()

  return (
    <div ref={rootElementRef}>
      <Button
        variant='primary'
        disabled={disabled}
        aria-expanded={active}
        onClick={toggleActiveState}
      >
        {i18nAdd}
      </Button>

      {
        active === true && (
          <Popover
            top={offset.y}
            right={offset.x}
            onClose={onPopoverClose}
            title={i18nAddPopoverTitle}
            description={i18nAddPopoverDesc}
          >
            <AddCriterion
              criteria={criteria}
              onSubmit={onAdd}
            />
          </Popover>
        )
      }
    </div>
  )
}

export default React.memo(AddCriterionDesktop)

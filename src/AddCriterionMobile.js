import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import Button from './Button'
import AddCriterion from './AddCriterion'
import useI18nLabel from './hooks/useI18nLabel'
import useCriterionAddableChecker from './hooks/useCriterionAddableChecker'

const useStyles = createUseStyles({
  root: {
    padding: '16px 16px'
  }
})

AddCriterionMobile.propTypes = {
  onAdd: PropTypes.func,
  active: PropTypes.bool,
  criteria: PropTypes.object,
  onActiveChange: PropTypes.func
}

function AddCriterionMobile (props) {
  const {
    criteria = {},
    active = false,
    onAdd: onAddProp,
    onActiveChange: onActiveChangeProp
  } = props

  const classes = useStyles()
  const i18nAdd = useI18nLabel('criteria.add-criterion-add')
  const isCriterionAddable = useCriterionAddableChecker(criteria)

  const onActiveChange = React.useCallback(newState => {
    if (typeof onActiveChangeProp !== 'function') return
    onActiveChangeProp(newState)
  }, [onActiveChangeProp])

  const toggleActiveState = React.useCallback(() => {
    onActiveChange(!active)
  }, [active, onActiveChange])

  const onAdd = React.useCallback(newCriterion => {
    if (typeof onAddProp === 'function') onAddProp(newCriterion)
    onActiveChange(false)
  }, [onAddProp, onActiveChange])

  return (
    isCriterionAddable === true && (
      <div className={classes.root}>
        {
          active === false ? (
            <Button
              variant='primary'
              onClick={toggleActiveState}
            >
              {i18nAdd}
            </Button>
          ) : (
            <AddCriterion
              criteria={criteria}
              onSubmit={onAdd}
            />
          )
        }
      </div>
    )
  )
}

export default React.memo(AddCriterionMobile)

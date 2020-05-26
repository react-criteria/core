import React from 'react'
import { createUseStyles } from 'react-jss'
import Button from './Button'
import AddCriterion from './AddCriterion'
import useI18nLabel from './hooks/useI18nLabel'

const useStyles = createUseStyles({
  root: {
    padding: '16px 16px'
  }
})

function AddCriterionMobile (props) {
  const {
    criteria = {},
    active = false,
    onAdd: onAddProp,
    onActiveChange: onActiveChangeProp
  } = props

  const classes = useStyles()
  const i18nAdd = useI18nLabel('criteria.add-criterion-add')

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
}

export default React.memo(AddCriterionMobile)

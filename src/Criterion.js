import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import Button from './Button'
import Divider from './Divider'
import useI18nLabel from './hooks/useI18nLabel'
import useCriterionComponent from './hooks/useCriterionComponent'

const useStyles = createUseStyles({
  actions: {
    display: 'flex'
  }
})

Criterion.propTypes = {
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
  deleteable: PropTypes.bool,
  value: PropTypes.string.isRequired,
  criterionInfo: PropTypes.shape({
    value: PropTypes.func,
    label: PropTypes.string,
    validate: PropTypes.func,
    component: PropTypes.shape({
      props: PropTypes.object,
      component: PropTypes.elementType
    }).isRequired
  })
}

function Criterion (props) {
  const {
    criterionInfo,
    value: valueProp,
    deleteable = true,
    onChange: onChangeProp,
    onDelete: onDeleteProp,
    onCancel: onCancelProp
  } = props

  const classes = useStyles()

  const [value, setValue] = React.useState(valueProp)

  const i18nSubmit = useI18nLabel('criterion.submit')
  const i18nCancel = useI18nLabel('criterion.cancel')
  const i18nRemove = useI18nLabel('criterion.remove')

  const onCancel = React.useCallback(() => {
    if (typeof onCancelProp !== 'function') return
    onCancelProp()
  }, [onCancelProp])

  const onDelete = React.useCallback(() => {
    if (typeof onDeleteProp !== 'function') return
    onDeleteProp()
  }, [onDeleteProp])

  const onChange = React.useCallback(() => {
    if (typeof onChangeProp !== 'function') return
    onChangeProp(value)
  }, [onChangeProp, value])

  const selectedCriterionDOM = useCriterionComponent(
    criterionInfo,
    value,
    setValue
  )

  const isFormSubmittable = React.useMemo(() => {
    if (value === valueProp) return false

    if (typeof criterionInfo.validate !== 'function') return true
    return criterionInfo.validate(value) === true
  })

  return (
    <div>
      {selectedCriterionDOM}

      <Divider />

      <div className={classes.actions}>
        <Button
          variant='primary'
          onClick={onChange}
          disabled={isFormSubmittable === false}
        >
          {i18nSubmit}
        </Button>

        <Button onClick={onCancel}>
          {i18nCancel}
        </Button>

        {
          deleteable !== false && (
            <Button onClick={onDelete}>
              {i18nRemove}
            </Button>
          )
        }
      </div>
    </div>
  )
}

export default React.memo(Criterion)

import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Select from './Select'
import Divider from './Divider'
import useI18nLabel from './hooks/useI18nLabel'
import useCriterionComponent from './hooks/useCriterionComponent'

AddCriterion.propTypes = {
  onSubmit: PropTypes.func,
  criteria: PropTypes.object
}

function AddCriterion (props) {
  const {
    criteria = {},
    onSubmit: onSubmitProp
  } = props

  const [value, setValue] = React.useState('')
  const [selectedCriterionName, setSelectedCriterionName] = React.useState('')
  const selectedCriterion = criteria[selectedCriterionName]

  const i18nType = useI18nLabel('add-criterion.type')
  const i18nSubmit = useI18nLabel('add-criterion.submit')
  const i18nTypePlaceholder = useI18nLabel('add-criterion.type-placeholder')

  const onSubmit = React.useCallback(() => {
    if (typeof onSubmitProp !== 'function') return

    onSubmitProp({
      value: value,
      type: selectedCriterionName
    })
  }, [onSubmitProp, value, selectedCriterionName])

  const criteriaOptions = React.useMemo(() => {
    return [
      {
        value: '',
        label: i18nTypePlaceholder
      },
      ...Object.keys(criteria).reduce((options, key) => {
        const criterionInfo = criteria[key]

        if (criterionInfo.addable === false) return options

        options.push({
          value: key,
          label: criterionInfo.label
        })

        return options
      }, [])
    ]
  }, [criteria, i18nTypePlaceholder])

  const selectedCriterionDOM = useCriterionComponent(
    selectedCriterion,
    value,
    setValue
  )

  const isFormSubmittable = React.useMemo(() => {
    if (selectedCriterion == null) return false

    if (typeof selectedCriterion.validate !== 'function') return true
    return selectedCriterion.validate(value)
  }, [value, selectedCriterion])

  return (
    <>
      <Select
        gutterBottom
        label={i18nType}
        options={criteriaOptions}
        value={selectedCriterionName}
        onChange={setSelectedCriterionName}
      />

      {selectedCriterionDOM}

      <Divider />

      <Button
        variant='primary'
        disabled={!isFormSubmittable}
        onClick={onSubmit}
      >
        {i18nSubmit}
      </Button>
    </>
  )
}

export default React.memo(AddCriterion)

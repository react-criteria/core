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
  const [selectedCriterion, setSelectedCriterion] = React.useState('')
  const isFormSubmittable = selectedCriterion !== ''

  const i18nType = useI18nLabel('add-criterion.type')
  const i18nSubmit = useI18nLabel('add-criterion.submit')
  const i18nTypePlaceholder = useI18nLabel('add-criterion.type-placeholder')

  const onSubmit = React.useCallback(() => {
    if (typeof onSubmitProp !== 'function') return

    onSubmitProp({
      value: value,
      type: selectedCriterion
    })
  }, [onSubmitProp, value, selectedCriterion])

  const criteriaOptions = React.useMemo(() => {
    return [
      {
        value: '',
        label: i18nTypePlaceholder
      },
      ...Object.keys(criteria).map(key => {
        const criterionInfo = criteria[key]

        return {
          value: key,
          label: criterionInfo.label
        }
      })
    ]
  }, [criteria, i18nTypePlaceholder])

  const selectedCriterionDOM = useCriterionComponent(
    criteria[selectedCriterion],
    value,
    setValue
  )

  return (
    <>
      <Select
        gutterBottom
        autoFocus
        options={criteriaOptions}
        value={selectedCriterion}
        label={i18nType}
        onChange={setSelectedCriterion}
      />

      {selectedCriterionDOM}

      <Divider />

      <Button
        variant='primary'
        onClick={onSubmit}
        disabled={!isFormSubmittable}
      >
        {i18nSubmit}
      </Button>
    </>
  )
}

export default React.memo(AddCriterion)

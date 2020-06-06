import React from 'react'

export default function useCriterionComponent (props) {
  const {
    value,
    onChange,
    criterionInfo,
    disabled = false
  } = props

  return React.useMemo(() => {
    if (criterionInfo == null) return null

    const CriterionComponent = criterionInfo.component.component

    const {
      value: _,
      label: __,
      onChange: ___,
      disabled: ____,
      ...criterionProps
    } = criterionInfo.component.props

    return (
      <CriterionComponent
        value={value}
        disabled={disabled}
        label={criterionInfo.label}
        onChange={onChange}
        {...criterionProps}
      />
    )
  }, [value, onChange, disabled, criterionInfo])
}

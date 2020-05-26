import React from 'react'

export default function useCriterionComponent (criterionInfo, value, onChange) {
  return React.useMemo(() => {
    if (criterionInfo == null) return null

    const CriterionComponent = criterionInfo.component.component

    const {
      value: _,
      label: __,
      onChange: ___,
      ...criterionProps
    } = criterionInfo.component.props

    return (
      <CriterionComponent
        value={value}
        label={criterionInfo.label}
        onChange={onChange}
        {...criterionProps}
      />
    )
  }, [criterionInfo, value, onChange])
}

import React from 'react'

export default function useCriterionAddableChecker (criteria = {}) {
  return React.useMemo(() => {
    return Object.keys(criteria).some(key => criteria[key].addable !== false)
  }, [criteria])
}

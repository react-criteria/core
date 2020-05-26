export default function useCriterionSummaryValue (valueFn, value) {
  return typeof valueFn !== 'function' ? value : valueFn(value)
}

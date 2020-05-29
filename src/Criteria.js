import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { useTheme } from './Theme'
import CriteriaMobile from './CriteriaMobile'
import CriteriaDesktop from './CriteriaDesktop'
import useViewportBreakpoint from './hooks/useViewportBreakpoint'

const useStyles = createUseStyles({
  root: theme => ({
    color: theme.typography.color,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,

    '& *': {
      boxSizing: 'border-box'
    }
  })
})

Criteria.propTypes = {
  onChange: PropTypes.func,
  criteria: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      deleteable: PropTypes.bool,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
}

function Criteria (props) {
  const {
    criteria = {},
    data: dataProp = [],
    onChange: onChangeProp
  } = props

  const classes = useStyles(useTheme())

  const isMobileViewport = useViewportBreakpoint()

  const data = React.useMemo(() => {
    return dataProp.filter(criterion => {
      return criteria[criterion.type] != null
    })
  }, [dataProp, criteria])

  const onChange = React.useCallback(newData => {
    if (typeof onChangeProp !== 'function') return
    onChangeProp(newData)
  }, [onChangeProp])

  const onNewCriterion = React.useCallback(newCriterion => {
    const newData = [...data]
    newData.push(newCriterion)
    onChange(newData)
  }, [data, onChange])

  const onUpdateCriterion = React.useCallback((index, newValue) => {
    const newData = [...data]
    const { type } = newData[index]
    newData.splice(index, 1, { type, value: newValue })
    onChange(newData)
  }, [data, onChange])

  const onDeleteCriterion = React.useCallback(index => {
    const newData = [...data]
    newData.splice(index, 1)
    onChange(newData)
  }, [data, onChange])

  const criteriaProps = {
    data: data,
    criteria: criteria,
    onNewCriterion: onNewCriterion,
    onUpdateCriterion: onUpdateCriterion,
    onDeleteCriterion: onDeleteCriterion
  }

  return (
    <div className={classes.root}>
      {
        isMobileViewport === true ? (
          <CriteriaMobile {...criteriaProps} />
        ) : (
          <CriteriaDesktop {...criteriaProps} />
        )
      }
    </div>
  )
}

export default React.memo(Criteria)

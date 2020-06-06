import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { useTheme } from './Theme'
import CriterionDesktop from './CriterionDesktop'
import AddCriterionDesktop from './AddCriterionDesktop'

const useStyles = createUseStyles({
  root: theme => ({
    display: 'flex',
    backgroundColor: theme.container.backgroundColor,
    padding: '16px 16px 8px 16px',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, .2)'
  }),

  criterias: {
    display: 'flex',
    overflowY: 'scroll',
    paddingBottom: '8px',

    '&::-webkit-scrollbar': {
      height: '7px',
      backgroundColor: 'transparent'
    },

    '&::-webkit-scrollbar-corner': {
      display: 'none'
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent'
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '2px',
      backgroundColor: 'rgba(0, 0, 0, .2)'
    }
  }
})

CriteriaDesktop.propTypes = {
  criteria: PropTypes.object,
  onNewCriterion: PropTypes.func,
  onUpdateCriterion: PropTypes.func,
  onDeleteCriterion: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      updatable: PropTypes.bool,
      deletable: PropTypes.bool,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
}

function CriteriaDesktop (props) {
  const {
    data,
    criteria,
    onNewCriterion: onNewCriterionProp,
    onUpdateCriterion: onUpdateCriterionProp,
    onDeleteCriterion: onDeleteCriterionProp
  } = props

  const classes = useStyles(useTheme())
  const [activeItem, setActiveItem] = React.useState(null)

  React.useEffect(() => {
    const listener = ev => {
      // Key: ESC
      if (ev.keyCode === 27) setActiveItem(null)
    }

    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [])

  const onNewCriterion = React.useCallback(newCriterion => {
    if (typeof onNewCriterionProp !== 'function') return
    onNewCriterionProp(newCriterion)
  }, [onNewCriterionProp])

  const onUpdateCriterion = React.useCallback((index, newValue) => {
    if (typeof onUpdateCriterionProp !== 'function') return
    onUpdateCriterionProp(index, newValue)
  }, [onUpdateCriterionProp])

  const onDeleteCriterion = React.useCallback(index => {
    if (typeof onDeleteCriterionProp !== 'function') return
    onDeleteCriterionProp(index)
  }, [onDeleteCriterionProp])

  const onActiveItemChange = React.useCallback((itemID, state) => {
    setActiveItem(state === false ? null : itemID)
  }, [])

  const criterionDOM = React.useMemo(() => {
    return data.map((criterion, index) => {
      const criterionInfo = criteria[criterion.type]

      const id = `criterion-${index}`
      const active = activeItem === id
      const disabled = activeItem != null && active === false

      return (
        <CriterionDesktop
          key={index}
          active={active}
          disabled={disabled}
          value={criterion.value}
          criterionInfo={criterionInfo}
          updatable={criterion.updatable}
          deletable={criterion.deletable}
          onDelete={() => onDeleteCriterion(index)}
          onActiveChange={state => onActiveItemChange(id, state)}
          onChange={
            updatedCriterion => onUpdateCriterion(index, updatedCriterion)
          }
        />
      )
    })
  }, [
    data,
    criteria,
    activeItem,
    onUpdateCriterion,
    onDeleteCriterion,
    onActiveItemChange
  ])

  const addCriterionDOM = React.useMemo(() => {
    const id = 'action-add'
    const active = activeItem === id
    const disabled = activeItem != null && active === false

    return (
      <AddCriterionDesktop
        active={active}
        disabled={disabled}
        criteria={criteria}
        onAdd={onNewCriterion}
        onActiveChange={state => onActiveItemChange(id, state)}
      />
    )
  }, [activeItem, criteria, onActiveItemChange, onNewCriterion])

  return (
    <div className={classes.root}>
      {
        criterionDOM.length > 0 && (
          <div className={classes.criterias}>
            {criterionDOM}
          </div>
        )
      }

      {addCriterionDOM}
    </div>
  )
}

export default React.memo(CriteriaDesktop)

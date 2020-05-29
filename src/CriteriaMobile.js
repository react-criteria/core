import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'
import Button from './Button'
import CriterionMobile from './CriterionMobile'
import AddCriterionMobile from './AddCriterionMobile'
import useI18nLabel from './hooks/useI18nLabel'

CriteriaMobile.propTypes = {
  criteria: PropTypes.object,
  onNewCriterion: PropTypes.func,
  onUpdateCriterion: PropTypes.func,
  onDeleteCriterion: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      deleteable: PropTypes.bool,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
}

function CriteriaMobile (props) {
  const {
    data,
    criteria,
    onNewCriterion: onNewCriterionProp,
    onUpdateCriterion: onUpdateCriterionProp,
    onDeleteCriterion: onDeleteCriterionProp
  } = props

  const [activeItem, setActiveItem] = React.useState(null)
  const [isModalOpen, setModalOpenState] = React.useState(false)

  const i18nModalTitle = useI18nLabel('criteria.modal-title')
  const i18nModalClose = useI18nLabel('criteria.modal-close')
  const i18nModalDesc = useI18nLabel('criteria.modal-description')
  const i18nModalButton = useI18nLabel('criteria.manage-criteria', data.length)

  React.useEffect(() => {
    const listener = ev => {
      // Key: ESC
      if (ev.keyCode === 27) setModalOpenState(false)
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

  const toggleModalOpenState = React.useCallback(() => {
    setModalOpenState(!isModalOpen)
  }, [isModalOpen])

  const onModalClose = React.useCallback(() => {
    setModalOpenState(false)
  }, [])

  const criterionDOM = React.useMemo(() => {
    return data.map((criterion, index) => {
      const criterionInfo = criteria[criterion.type]

      const id = `criterion-${index}`
      const active = activeItem === id

      return (
        <CriterionMobile
          key={index}
          active={active}
          value={criterion.value}
          criterionInfo={criterionInfo}
          deleteable={criterion.deleteable}
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

    return (
      <AddCriterionMobile
        active={active}
        criteria={criteria}
        onAdd={onNewCriterion}
        onActiveChange={state => onActiveItemChange(id, state)}
      />
    )
  }, [activeItem, criteria, onActiveItemChange, onNewCriterion])

  return (
    <>
      <Button
        onClick={toggleModalOpenState}
      >
        {i18nModalButton}
      </Button>

      {
        isModalOpen === true && (
          <Modal
            title={i18nModalTitle}
            description={i18nModalDesc}
            actions={[
              <Button key='close-modal' onClick={onModalClose}>
                {i18nModalClose}
              </Button>
            ]}
          >

            {criterionDOM}

            {addCriterionDOM}
          </Modal>
        )
      }
    </>
  )
}

export default React.memo(CriteriaMobile)

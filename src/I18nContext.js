import React from 'react'

export default React.createContext({
  'criteria.manage-criteria': amount => `Manage Criteria (${amount})`,
  'criteria.add-criterion-add': 'Add',
  'criteria.add-criterion-title': 'Create a new criteria',
  'criteria.add-criterion-description': 'Create a new criteria',
  'criteria.criterion-title': label => `Manage '${label}' criterion`,
  'criteria.criterion-description': label => `Manage '${label}' criterion`,
  'criteria.modal-close': 'Close',
  'criteria.modal-title': 'Manage Criteria',
  'criteria.modal-description': 'View and manage your criteria',

  'add-criterion.submit': 'Submit',
  'add-criterion.type': 'Criterion Type',
  'add-criterion.type-placeholder': 'Select criterion type',

  'criterion.submit': 'Submit',
  'criterion.cancel': 'Cancel',
  'criterion.remove': 'Remove',

  'popover.overlay-title': 'Close Criterion'
})

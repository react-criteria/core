import React from 'react'
import '@testing-library/jest-dom'
import useDOMID from 'use-dom-id'
import { act, render, fireEvent } from '@testing-library/react'

import Criteria from './Criteria'

describe('Criteria Mobile Viewport Tests', () => {
  let originalWindowWidth = null

  beforeEach(() => {
    act(() => {
      originalWindowWidth = window.innerWidth

      window.innerWidth = 200
      window.dispatchEvent(new Event('resize'))
    })
  })

  afterEach(() => {
    act(() => {
      window.innerWidth = originalWindowWidth
      window.dispatchEvent(new Event('resize'))
    })
  })

  describe('Rendering a Criteria component', () => {
    describe('When rendering a Criteria component', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )
      })

      it('should display a button for the user to view the criteria', () => {
        expect(info.queryByText('Manage Criteria (2)')).toBeInTheDocument()
      })
    })
  })

  describe('Opening Criteria modal', () => {
    describe('Given a Criteria component', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )
      })

      describe('when clicking on the manage criteria button', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Manage Criteria (2)'))
        })

        it('should open a modal showing the details about the current selected criteria', () => {
          expect(info.queryByText('Criterion One')).toBeInTheDocument()
          expect(info.queryByText('Criterion Two')).toBeInTheDocument()
          expect(info.queryByText('criterion-one-value')).toBeInTheDocument()
          expect(info.queryByText('criterion-two-value')).toBeInTheDocument()

          expect(info.queryByText('Criterion Three')).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('Closing Criteria modal', () => {
    describe('Given a Criteria component', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )
      })

      describe('having the criteria modal opened', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Manage Criteria (2)'))
        })

        describe('when clicking on the close button', () => {
          beforeEach(() => {
            fireEvent.click(info.getByText('Close'))
          })

          it('should hide the criteria modal', () => {
            expect(info.queryByText('Criterion One')).not.toBeInTheDocument()
            expect(info.queryByText('Criterion Two')).not.toBeInTheDocument()
            expect(info.queryByText('Criterion Three')).not.toBeInTheDocument()
            expect(info.queryByText('criterion-one-value')).not.toBeInTheDocument()
            expect(info.queryByText('criterion-two-value')).not.toBeInTheDocument()
          })
        })
      })
    })
  })

  describe('Rendering a Criteria component without an addable criterion', () => {
    describe('When rendering a Criteria component without and addable criterion', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            addable: false,
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            addable: false,
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            addable: false,
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      it('should hide the Add button', () => {
        expect(info.queryByText('Add')).not.toBeInTheDocument()
      })

      it('should display the value of the criteria accordingly', () => {
        expect(info.queryByText('Criterion One')).toBeInTheDocument()
        expect(info.queryByText('Criterion Two')).toBeInTheDocument()
        expect(info.queryByText('criterion-one-value')).toBeInTheDocument()
        expect(info.queryByText('criterion-two-value')).toBeInTheDocument()

        expect(info.queryByText('Criterion Three')).not.toBeInTheDocument()
      })
    })
  })

  describe('Rendering a Criteria component with a mix of addable and unaddable criterions', () => {
    describe('When rendering a Criteria component with a mix of addable and unaddable criterions', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            addable: false,
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      it('should restrict you from adding unaddable criterions', () => {
        fireEvent.click(info.getByText('Add'))

        // There should only be 1 `Criterion Two` - showing the summary.
        expect(info.getAllByText('Criterion Two').length).toBe(1)
      })

      it('should display the value of the criteria accordingly', () => {
        expect(info.queryByText('Criterion One')).toBeInTheDocument()
        expect(info.queryByText('Criterion Two')).toBeInTheDocument()
        expect(info.queryByText('criterion-one-value')).toBeInTheDocument()
        expect(info.queryByText('criterion-two-value')).toBeInTheDocument()

        expect(info.queryByText('Criterion Three')).not.toBeInTheDocument()
      })
    })
  })

  describe('Customizing a criterion value', () => {
    describe('When rendering a Criteria component with a criterion configured to customize its value', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            value: value => `customized-${value}`,
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      it('should display the value of the criteria accordingly', () => {
        expect(info.queryByText('Criterion One')).toBeInTheDocument()
        expect(info.queryByText('Criterion Two')).toBeInTheDocument()
        expect(info.queryByText('customized-criterion-one-value'))
          .toBeInTheDocument()
        expect(info.queryByText('criterion-two-value')).toBeInTheDocument()

        expect(info.queryByText('Criterion Three')).not.toBeInTheDocument()
      })
    })
  })

  describe('Specifying a criterion with an unknown criteria type', () => {
    describe('Given a Criteria component with a criterion having an invalid type', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }, {
          type: 'criteriaInvalid',
          value: 'criteria-invalid-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      it('should only show the criterion with the valid types', () => {
        expect(info.queryByText('Criterion One')).toBeInTheDocument()
        expect(info.queryByText('Criterion Two')).toBeInTheDocument()
        expect(info.queryByText('criterion-one-value')).toBeInTheDocument()
        expect(info.queryByText('criterion-two-value')).toBeInTheDocument()

        expect(info.queryByText('Criterion Three')).not.toBeInTheDocument()

        expect(info.queryByText('criteria-invalid-value'))
          .not.toBeInTheDocument()
      })
    })
  })

  describe('Specifying an undeleteable criterion', () => {
    describe('Given a Criteria component with an undeleteable criterion', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          deleteable: false,
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      it('should not allow the user to delete the undeleteable criterion', () => {
        fireEvent.click(info.getByText('Criterion One'))
        expect(info.queryByText('Remove')).not.toBeInTheDocument()

        fireEvent.click(info.getByText('Criterion Two'))
        expect(info.queryByText('Remove')).toBeInTheDocument()
      })
    })
  })

  describe('Clicking on a criterion', () => {
    describe('Given a Criteria component', () => {
      let info = null

      beforeEach(() => {
        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={jest.fn()}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      describe('when clicking on a criterion', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Criterion One'))
        })

        it('should open a panel enabling you to modify it', () => {
          expect(info.getByLabelText('Criterion One').value)
            .toBe('criterion-one-value')
        })
      })
    })
  })

  describe('Clicking on a criterion while it is open', () => {
    describe('Given a Criteria component', () => {
      let info = null
      let onChange = null

      beforeEach(() => {
        onChange = jest.fn()

        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={onChange}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      describe('having an open criterion', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Criterion One'))
        })

        describe('having been updated', () => {
          beforeEach(() => {
            fireEvent.change(
              info.queryByLabelText('Criterion One'),
              { target: { value: 'updated-criterion-one-value' } }
            )
          })

          describe('when clicking on an open criterion', () => {
            beforeEach(() => {
              fireEvent.click(info.getAllByText('Criterion One')[0])
            })

            it('should close the criterion panel', () => {
              expect(info.queryByLabelText('Criterion One'))
                .not.toBeInTheDocument()
            })

            it('should not persist the changes', () => {
              expect(onChange).not.toHaveBeenCalled()
            })
          })
        })
      })
    })
  })

  describe('Cancelling unpersisted updates to a criterion', () => {
    describe('Given a Criteria component', () => {
      let info = null
      let onChange = null

      beforeEach(() => {
        onChange = jest.fn()

        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={onChange}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      describe('having a updated a criterion', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Criterion One'))

          fireEvent.change(
            info.queryByLabelText('Criterion One'),
            { target: { value: 'updated-criterion-one-value' } }
          )
        })

        describe('when cancelling the update', () => {
          beforeEach(() => {
            fireEvent.click(info.getByText('Cancel'))
          })

          it('should close the criterion panel', () => {
            expect(info.queryByLabelText('Criterion One'))
              .not.toBeInTheDocument()
          })

          it('should not persist the changes', () => {
            expect(onChange).not.toHaveBeenCalled()
          })
        })
      })
    })
  })

  describe('Adding a new criterion', () => {
    describe('Given a Criteria component', () => {
      let info = null
      let onChange = null

      beforeEach(() => {
        onChange = jest.fn()

        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={onChange}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      describe('when adding a new criterion', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Add'))

          fireEvent.change(
            info.getByLabelText('Criterion Type'),
            { target: { value: 'criterionThree' } }
          )

          fireEvent.change(
            info.getByLabelText('Criterion Three'),
            { target: { value: 'criteria-three-value' }}
          )

          fireEvent.click(info.getByText('Submit'))
        })

        it('should invoke the onChange listener with the newly updated criteria', () => {
          expect(onChange).toHaveBeenCalledTimes(1)
          expect(onChange).toHaveBeenCalledWith([
            {
              type: 'criterionOne',
              value: 'criterion-one-value'
            }, {
              type: 'criterionTwo',
              value: 'criterion-two-value'
            }, {
              type: 'criterionThree',
              value: 'criteria-three-value'
            }
          ])
        })

        it('should close the Add Criterion panel', () => {
          expect(info.queryByLabelText('Criterion Type'))
            .not.toBeInTheDocument()
        })
      })
    })
  })

  describe('Removing an existing criterion', () => {
    describe('Given a Criteria component', () => {
      let info = null
      let onChange = null

      beforeEach(() => {
        onChange = jest.fn()

        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={onChange}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      describe('when removing an existing criterion', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Criterion One'))
          fireEvent.click(info.getByText('Remove'))
        })

        it('should invoke the onChange listener with the newly updated criteria', () => {
          expect(onChange).toHaveBeenCalledTimes(1)
          expect(onChange).toHaveBeenCalledWith([
            {
              type: 'criterionTwo',
              value: 'criterion-two-value'
            }
          ])
        })

        it('should close close the panel of the removed criterion', () => {
          expect(info.queryByLabelText('Remove')).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('Updating an existing criterion', () => {
    describe('Given a Criteria component', () => {
      let info = null
      let onChange = null

      beforeEach(() => {
        onChange = jest.fn()

        const data = [{
          type: 'criterionOne',
          value: 'criterion-one-value'
        }, {
          type: 'criterionTwo',
          value: 'criterion-two-value'
        }]

        const criteria = {
          criterionOne: {
            label: 'Criterion One',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion one'
              }
            }
          },
          criterionTwo: {
            label: 'Criterion Two',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion two'
              }
            }
          },
          criterionThree: {
            label: 'Criterion Three',
            component: {
              component: CriterionField,
              props: {
                value: '',
                onChange: () => {},
                placeholder: 'Enter value for criterion three'
              }
            }
          }
        }

        info = render(
          <Criteria
            data={data}
            criteria={criteria}
            onChange={onChange}
          />
        )

        fireEvent.click(info.getByText('Manage Criteria (2)'))
      })

      describe('when updating an existing criterion', () => {
        beforeEach(() => {
          fireEvent.click(info.getByText('Criterion One'))

          fireEvent.change(
            info.getByLabelText('Criterion One'),
            { target: { value: 'updated-criterion-one-value' } }
          )

          fireEvent.click(info.getByText('Submit'))
        })

        it('should invoke the onChange listener with the newly updated criteria', () => {
          expect(onChange).toHaveBeenCalledTimes(1)
          expect(onChange).toHaveBeenCalledWith([
            {
              type: 'criterionOne',
              value: 'updated-criterion-one-value'
            }, {
              type: 'criterionTwo',
              value: 'criterion-two-value'
            }
          ])
        })

        it('should close the panel of the updated criteria', () => {
          expect(info.queryByLabelText('Criterion One')).not.toBeInTheDocument()
        })
      })
    })
  })
})

function CriterionField (props) {
  const {
    value,
    label,
    onChange: onChangeProp,
    ...otherProps
  } = props

  const id = useDOMID('test-criteria-field')

  const onChange = React.useCallback(ev => {
    if (typeof onChangeProp !== 'function') return
    onChangeProp(ev.target.value)
  }, [onChangeProp])

  return (
    <>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type='text'
        value={value}
        {...otherProps}
        onChange={onChange}
      />
    </>
  )
}

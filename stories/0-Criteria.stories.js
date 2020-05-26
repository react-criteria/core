import React from 'react'
import { action } from '@storybook/addon-actions'
import Select from './lib/Select'
import Textfield from './lib/Textfield'

import Criteria, {
  createTheme,
  I18nContext,
  ThemeProvider
}  from '../src'

export default {
  title: 'Criteria',
  component: Criteria
}

export const Default = () => {
  const [data, setData] = React.useState(
    [{
      type: 'location',
      value: '1'
    }]
  )

  const onChange = React.useCallback(newData => {
    setData(newData)
    action('onDataChange')(newData)
  }, [])

  const locations = [
    'Malta', 'Italy', 'Spain', 'France', 'Germany'
  ]

  return (
    <Criteria
      data={data}
      onChange={onChange}
      criteria={{
        guests: {
          label: 'Guests',
          component: {
            component: Textfield,
            props: {
              min: 0,
              max: 6,
              type: 'number',
              autoFocus: true,
              placeholder: 'Enter number of guests'
            }
          }
        },
        beds: {
          label: 'Beds',
          component: {
            component: Textfield,
            props: {
              min: 0,
              max: 3,
              type: 'number',
              autoFocus: true,
              placeholder: 'Enter number of beds'
            }
          }
        },
        location: {
          label: 'Location',
          value: value => locations[value],
          component: {
            component: Select,
            props: {
              autoFocus: true,
              options: locations.map(
                (location, index) => {
                  return {
                    value: String(index),
                    label: location
                  }
                }
              )
            }
          }
        }
      }}
    />
  )
}

export const Theme = () => {
  const theme = createTheme({
    palette: {
      primary: '#9C27B0',
      secondary: '#4CAF50'
    },
    typography: {
      color: '#ffffff',
      fontSize: '14px',
      fontFamily: 'sans-serif'
    },
    container: {
      backgroundColor: '#424242',
      borderColor: 'rgba(255, 255, 255, .1)'
    },
    button: {
      primaryColor: '#ffffff',
      secondaryColor: '#ffffff',

      defaultColor: '#ffffff',
      defaultBackgroundColor: '#424242',
      defaultHoverBackgroundColor: '#333333',

      disabledColor: 'rgba(255, 255, 255, 0.26)',
      disabledBackgroundColor: 'rgba(0, 0, 0, .12)'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Default />
    </ThemeProvider>
  )
}

export const Localized = () => {
  const i18n = {
    'criteria.manage-criteria': amount => `Gestisci criteri (${amount})`,
    'criteria.add-criterion-add': 'Inserisci',
    'criteria.add-criterion-title': 'Crea un nuovo criterio',
    'criteria.add-criterion-description': 'Crea un nuovo criterio',
    'criteria.criterion-title': label => `Gestisci i criterio dei '${label}'`,
    'criteria.criterion-description': label => `Gestisci i criterio dei '${label}'`,
    'criteria.modal-close': 'Chuidi',
    'criteria.modal-title': 'Gestisci Criteri',
    'criteria.modal-description': 'Modal Description',

    'add-criterion.submit': 'Invia',
    'add-criterion.type': 'Tipo di criterio',
    'add-criterion.type-placeholder': 'Seleziona il tipo di crition',

    'criterion.submit': 'Invia',
    'criterion.cancel': 'Annulla',
    'criterion.remove': 'Rimuovere'
  }

  return (
    <I18nContext.Provider value={i18n}>
      <Default />
    </I18nContext.Provider>
  )
}

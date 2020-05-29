<div align="center">
  <h1>react-criteria</h1>

  <br />

  <img width="500" alt="Screenshot 2020-05-26 at 21 03 33" src="https://user-images.githubusercontent.com/5364897/82940042-87c48180-9f94-11ea-8724-fa74f63c43e6.png">

  [![Build Status](https://travis-ci.org/react-criteria/core.svg?branch=master)](https://travis-ci.org/react-criteria/core)
  [![codecov](https://codecov.io/gh/react-criteria/core/branch/master/graph/badge.svg)](https://codecov.io/gh/react-criteria/core)
  [![npm version](https://badge.fury.io/js/react-criteria.svg)](https://badge.fury.io/js/react-criteria)

  <hr />
</div>



## Why?

You need a widget that a user can use to specify any criteria of data rendered in your app. Be it for filtering, sorting, grouping; you name it. You want this widget to be responsive, accessible and easy to integrate. You also want it to have support for configurable labels for internationalization, to be themeable so that it blends in flawlessly into your UI and to be easily extendable - enabling you to support any type of criteria.

## Install

### NPM

```bash
npm install --save react-criteria
```

### Yarn

```bash
yarn add react-criteria
```

## Examples

### Basic

```javascript
import Criteria from 'react-criteria'
import Select from 'react-criteria-select'
import Textfield from 'react-criteria-textfield'

function MyComponent () {
  const [data, setData] = React.useState(
    [{
      type: 'location',
      value: '1'
    }, {
      type: 'guests',
      value: '3'
    }, {
      type: 'beds',
      value: '2'
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

export default React.memo(MyComponent)
```

<div align="center">
  <img width="500" alt="Basic usage example preview" src="https://user-images.githubusercontent.com/5364897/83048286-a89ade80-a049-11ea-96f8-ddbb30daf0f0.png">
</div>

### Theme

```javascript
import Criteria, {
  createTheme,
  ThemeProvider
} from 'react-criteria'

function MyComponent () {
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
      <Criteria ... />
    </ThemeProvider>
  )
}

export default React.memo(MyComponent)
```

<div align="center">
  <img width="500" alt="Theme example preview" src="https://user-images.githubusercontent.com/5364897/83048289-aa64a200-a049-11ea-82d8-97099929660f.png">
</div>

### Internationalization

```javascript
import Criteria, {
  I18nContext
} from 'react-criteria'

function MyComponent () {
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
    'add-criterion.type-placeholder': 'Seleziona il tipo di criterio',

    'criterion.submit': 'Invia',
    'criterion.cancel': 'Annulla',
    'criterion.remove': 'Rimuovere',

    'popover.overlay-title': 'Chuidi l criterio'
  }

  return (
    <I18nContext.Provider value={i18n}>
      <Criteria ... />
    </I18nContext.Provider>
  )
}

export default React.memo(MyComponent)
```

<div align="center">
  <img width="503" alt="Internationalization example preview" src="https://user-images.githubusercontent.com/5364897/83048295-ab95cf00-a049-11ea-8ae9-105c7404374d.png">
</div>

## License

The React Criteria component is licensed under the [CC-BY-NC-4.0 license](https://creativecommons.org/licenses/by-nc/4.0/).

You can [purchase a license](https://gumroad.com/l/BUQVM) if you want to use it in a commercial project.

export default function createTheme (customTheme = {}) {
  const defaultTheme = {
    palette: {
      primary: '#9C27B0',
      secondary: '#4CAF50'
    },
    typography: {
      color: '#424242',
      fontSize: '14px',
      fontFamily: 'sans-serif'
    },
    container: {
      backgroundColor: '#ffffff',
      borderColor: 'rgba(0, 0, 0, .1)'
    },
    button: {
      primaryColor: '#ffffff',
      secondaryColor: '#ffffff',

      defaultColor: '#424242',
      defaultBackgroundColor: '#ffffff',
      defaultHoverBackgroundColor: 'rgba(0, 0, 0, .1)',

      disabledColor: 'rgba(0, 0, 0, .26)',
      disabledBackgroundColor: 'rgba(0, 0, 0, .12)'
    }
  }

  return Object.keys(defaultTheme).reduce((theme, key) => {
    theme[key] = Object.assign({}, defaultTheme[key], customTheme[key])
    return theme
  }, {})
}

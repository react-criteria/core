import React from 'react'
import { createTheming } from 'react-jss'
import createTheme from './lib/createTheme'

const {
  useTheme,
  ThemeProvider
} = createTheming(React.createContext(createTheme()))

export { useTheme, ThemeProvider }

import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideosList: [],
  savedVideoButtonClicked: () => {},
})

export default ThemeContext

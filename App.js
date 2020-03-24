import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'

import Screens from './src/screens'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <Screens />
    </Provider>
  )
}

export default App

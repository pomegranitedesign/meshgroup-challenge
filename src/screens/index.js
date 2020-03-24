import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import DataTable from './DataTable'

const Stack = createStackNavigator()

const Screens = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="DataTable" component={DataTable} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Screens

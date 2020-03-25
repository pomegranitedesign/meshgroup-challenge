import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import DataTable from './DataTable'
import Racer from './Racer'

const Stack = createStackNavigator()

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen name="DataTable" component={DataTable} />
        <Stack.Screen name="Racer" component={Racer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Screens

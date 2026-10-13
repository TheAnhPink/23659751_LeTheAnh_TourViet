import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import HomeScreen from './screen/HomeScreen'
import ListScreen from './screen/ListScreen'
import Detail from './screen/Detail'

export type kieuDLManHinh={
  Home:undefined,
  List: undefined,
  Detail: {
    id: string
  }
}

const Stack= createNativeStackNavigator<kieuDLManHinh>()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="List" component={ListScreen}></Stack.Screen>
        <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App

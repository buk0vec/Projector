import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SettingsScreen, AllTasksScreen } from "../screens"
import { PrimaryParamList } from "./types"
import { Text } from "react-native-elements"

const Tab = createBottomTabNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarLabel: ({ color }) => {
        if (route.name === "AllTasks") {
          return <Text style={{ color: color }}>All Tasks</Text>
        } else if (route.name === "Settings") {
          return <Text style={{ color: color }}>Settings</Text>
        } else {
          return <Text>Default</Text>
        }
      }
    })}>
      <Tab.Screen name="AllTasks" component={AllTasksScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */

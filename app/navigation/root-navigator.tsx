import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { RootParamList } from "./types"
import { AuthNavigator } from "./auth-navigator"
import { PrimaryNavigator } from "./primary-navigator"

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "push",
      }}
    >
      <Stack.Screen
        name="auth"
        component={AuthNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="primaryStack"
        component={PrimaryNavigator}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"

export const exitRoutes: string[] = ["sign-in", "AllTasks"]

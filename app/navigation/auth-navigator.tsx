import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { SignInScreen, SignUpScreen } from "../screens"
import { AuthParamList } from "./types"

const Stack = createNativeStackNavigator<AuthParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="signin" component={SignInScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="signup" component={SignUpScreen} options={{ headerShown: true, headerTitle: "", headerBackTitleVisible: false }}/>
    </Stack.Navigator>
  )
}

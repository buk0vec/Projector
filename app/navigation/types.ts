import { FirebaseAuthTypes } from "@react-native-firebase/auth"

export type RootParamList = {
  primaryStack: undefined
  auth: undefined
  loadedUser: FirebaseAuthTypes.User
}

export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  Settings: undefined
  AllTasks: undefined
}

export type AuthParamList = {
  signin: undefined
  signup: undefined
}

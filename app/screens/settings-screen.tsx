import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../components"
// import { useStores } from "../models/root-store"
import { Text, Button } from "react-native-elements"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { useEffect, useState } from 'react'

export interface SettingsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {

}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer((props) => {
  // const { someStore } = useStores()

  // Stores user data in state
  // @TODO: Move this data over to MobX
  const [userUID, setUserUID] = useState<string>(auth().currentUser.uid)
  const [firstName, setFirstName] = useState<string | undefined>("")
  const [lastName, setLastName] = useState<string>("")

  // Sets up listener on user data, for firstName and lastName
  useEffect(() => {
    setUserUID(auth().currentUser.uid)
    const subscriber = firestore()
      .collection("users")
      .doc(userUID)
      .onSnapshot(documentSnapshot => {
        setFirstName(documentSnapshot.get<string>("firstName"))
        setLastName(documentSnapshot.get<string>("lastName"))
      })
    return () => subscriber
  }, [])

  // Signs out the user
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log("Signed out!")
        props.navigation.navigate("auth", { screen: "signin" })
      })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text h1>Settings</Text>
      <Text h2>{firstName} {lastName}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </Screen>
  )
})

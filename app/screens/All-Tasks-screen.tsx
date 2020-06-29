import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../components"
import { Text, Button } from "react-native-elements"
// import { useStores } from "../models/root-store"
import functions from "@react-native-firebase/functions"
import auth from "@react-native-firebase/auth"

export interface AllTasksScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {

}

export const AllTasksScreen: React.FunctionComponent<AllTasksScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const handleNewTaskPress = () => {
    console.log("Calling function...")
    functions().httpsCallable('createSingularTask')({
      taskName: "Test",
      taskDescription: "Test description",
      deadlineType: "ON",
      deadlineDate: {
        day: 4,
        month: 6,
        year: 2020
      },
      isComplete: false,
      users: [auth().currentUser.uid]
    }).then(() => {
      console.log("Function execution worked!")
    }).catch(error => {
      console.log("It did not work,", error.code)
    })
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Text h1>All Tasks</Text>
      <Button title="Add new task" onPress={handleNewTaskPress} />
    </Screen>
  )
})

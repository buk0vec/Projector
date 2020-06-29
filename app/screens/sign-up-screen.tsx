import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../components"
// import { useStores } from "../models/root-store"
import { Text, Button, Input } from "react-native-elements"
import { useState, useRef } from "react"
import auth from "@react-native-firebase/auth"
import functions from "@react-native-firebase/functions"

export interface SignUpScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>,
  route: any
}

const ROOT: ViewStyle = {

}

export const SignUpScreen: React.FunctionComponent<SignUpScreenProps> = observer((props) => {
  //  const { someStore } = useStores()
  //  Input field state
  const [email, setEmail] = useState<string>(props.route.params.oldEmail)
  const [password, setPassword] = useState<string>(props.route.params.oldPassword)
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  //  Input error state
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [firstNameError, setFirstNameError] = useState<string>("")
  const [lastNameError, setLastNameError] = useState<string>("")

  //  refs to the inputs
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  // Runs when the sign up button is pressed
  // Checks for valid inputs, handles errors if inputs aren't valid,
  // then signs the user up and runs cloud function to update
  // their data.
  const handleSignUpPress = () => {
    // Clear errors
    let abortSignup = false
    setFirstNameError("")
    setLastNameError("")
    setEmailError("")
    setPasswordError("")

    // Check for null inputs, set error flag if so and display error to user
    if (firstName.length === 0) {
      setFirstNameError("Please enter a first name")
      firstNameRef.current.shake()
      abortSignup = true
    }
    if (lastName.length === 0) {
      setLastNameError("Please enter a last name")
      lastNameRef.current.shake()
      abortSignup = true
    }
    if (email.length === 0) {
      setEmailError("Please enter a valid email address")
      emailRef.current.shake()
      abortSignup = true
    }
    if (password.length === 0) {
      setPasswordError("Password should be at least six characters")
      passwordRef.current.shake()
      abortSignup = true
    }
    // If error flag is set, return
    if (abortSignup) {
      return
    }
    // Create a new user
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User created!")
        // If successful, then update the user's data
        functions().httpsCallable('updateUserData')({ firstName: firstName, lastName: lastName })
          .then(() => {
            console.log("User infomation updated!")
          })
          .catch(error => {
            // This shouldn't happen unless Google fails me
            console.log(error)
          })
          // Navigate to the main stack
        passwordRef.current.clear()
        props.navigation.navigate("primaryStack")
      })
      .catch(error => {
        // Run through all possible returned errors and find a way to display them to the user
        if (error.code === "auth/email-already-in-use") {
          setEmailError("An account with this email already exists")
          emailRef.current.shake()
        } else if (error.code === "auth/invalid-email") {
          setEmailError("Please enter a valid email address")
          emailRef.current.shake()
        } else if (error.code === "auth/weak-password") {
          setPasswordError("Password should be at least six characters")
          passwordRef.current.shake()
        } else {
          setPasswordError("An unexpected error has occured. Please try again later.")
          console.log(error.code)
        }
      })
  }
  return (
    <Screen style={ROOT} preset="centeredFixed">
      <Text h1>Sign Up</Text>
      <Input ref={firstNameRef} errorMessage={firstNameError} textContentType="givenName"
        placeholder="First Name" onChangeText={ firstName => setFirstName(firstName) } />
      <Input ref={lastNameRef} errorMessage={lastNameError} textContentType="familyName"
        placeholder="Last Name" onChangeText={ lastName => setLastName(lastName) } />
      <Input ref={emailRef} errorMessage={emailError} textContentType="emailAddress"
        placeholder="Email" defaultValue={ props.route.params.oldEmail } onChangeText={ email => setEmail(email) }/>
      <Input ref={passwordRef} errorMessage={passwordError} textContentType="newPassword" secureTextEntry={true}
        placeholder="Password" defaultValue={ props.route.params.oldPassword } onChangeText={ password => setPassword(password) }/>
      <Button title="Sign Up" onPress={handleSignUpPress} />
    </Screen>
  )
})

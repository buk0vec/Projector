import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen } from "../components"
import { Text, Input, Button } from "react-native-elements"
import auth from '@react-native-firebase/auth'
import { useState, useRef } from "react"
// import { useStores } from "../models/root-store"

export interface SignInScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

const SignInInputStyle: ViewStyle = {
  flex: 1
}

const FlexSpacerStyle: ViewStyle = {
  flex: 1
}

const ButtonStyle = {
  flex: 1
}

export const SignInScreen: React.FunctionComponent<SignInScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  // Email and password state vals
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // Email and password error messages
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  // Reference to the two <Input> components
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  // Handles pressing the sign in button
  const handleSignInPress = () => {
    let abortSignup = false
    setEmailError("")
    setPasswordError("")
    console.log("Sign in press")
    // Check for null inputs, set error flag if so and display error to user
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
      console.log("Sign in aborting...")
      return
    }
    // Try to sign in
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Log in, go to main stack, and CLEAR THE PASSWORD BOX
        console.log("Sicko mode")
        props.navigation.navigate("primaryStack")
        setPassword("")
        passwordRef.current.clear()
      })
      .catch(error => {
        // Hella error handling
        if (error.code === "auth/invalid-email") {
          setEmailError("Please enter a valid email")
          emailRef.current.shake()
        } else if (error.code === "auth/user-not-found") {
          setEmailError("User with this email not found")
          emailRef.current.shake()
        } else if (error.code === "auth/wrong-password") {
          setPasswordError("Incorrect password")
          passwordRef.current.shake()
        } else {
          setPasswordError("An unexpected error has occurred. Please try again later")
        }
      })
  }

  return (
    <Screen preset="centeredFixed">
      <View style={FlexSpacerStyle} />
      <Text h1>Sign In</Text>
      <Input ref={emailRef} errorMessage={emailError} textContentType="emailAddress"
        placeholder="Email" containerStyle={SignInInputStyle} onChangeText={email => setEmail(email)}/>
      <Input ref={passwordRef} errorMessage={passwordError} textContentType="password" secureTextEntry={true}
        placeholder="Password" containerStyle={SignInInputStyle} onChangeText={password => setPassword(password)}/>
      <Button title="Sign In" onPress={handleSignInPress} style={ButtonStyle}/>
      <Button title="Sign Up" style={ButtonStyle} onPress={() => props.navigation.navigate("signup", { oldEmail: email, oldPassword: password })}/>
      <View style={FlexSpacerStyle} />
    </Screen>
  )
})

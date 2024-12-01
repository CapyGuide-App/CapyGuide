import React from "react";
import AuthForm from "../components/AuthForm";
import { Alert } from "react-native";
import { fetchRegister } from "../request/DataRequest";

import { NavigationProp } from '@react-navigation/native';

const SignUpScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const onSubmit = async (formData: { username: any; password: any; email: any; displayName: any; confirmPassword: any; }) => {
    const { username, password, email, displayName, confirmPassword } = formData;

    if (!email || !displayName || !username || !password || !confirmPassword) {
      return Alert.alert("Error", "All fields are required!");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match!");
    }

    try {
      await fetchRegister(displayName, username, password, email);
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("LoginScreen");
    } catch (error: Error | any) {
      Alert.alert("Error", error.message);
    }
  }
  return (
    <AuthForm
      title="Create an Account"
      buttonText="Sign Up"
      promptText="Already have an account?"
      switchText="Login"
      onSwitch={() => navigation.navigate("LoginScreen")}
      isSignUp={true}
      onSubmit={onSubmit}
    />
  );
};

export default SignUpScreen;

import React from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { fetchLogin } from "../request/DataRequest";
import { Alert } from "react-native";

import { NavigationProp } from '@react-navigation/native';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { login } = useAuth();
  const onSubmit = async (formData: { username: any; password: any; }) => {
    const { username, password } = formData;

    if (!username || !password) {
      return Alert.alert("Error", "All fields are required!");
    }

    try {
      await fetchLogin(username, password);
      login();
    } catch (error: Error | any) {
      Alert.alert("Error", error.message);
    }
  };
  
  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      promptText="Don't have an account?"
      switchText="Sign Up"
      onSwitch={() => navigation.navigate("SignUpScreen")}
      onSubmit={onSubmit}
    />
  );
};

export default LoginScreen;

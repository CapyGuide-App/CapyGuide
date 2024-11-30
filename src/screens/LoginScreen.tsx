import React from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth(); 

  const handleLogin = () => {
    login(); 
  };

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      promptText="Don’t have an account?"
      switchText="Sign Up"
      onSwitch={() => navigation.navigate("SignUpScreen")}
      onSubmit={handleLogin}
    />
  );
};

export default LoginScreen;

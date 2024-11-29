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
      switchText="Don’t have an account? Sign Up"
      onSwitch={() => navigation.navigate("SignUpScreen")}
      onSubmit={handleLogin}
    />
  );
};

export default LoginScreen;

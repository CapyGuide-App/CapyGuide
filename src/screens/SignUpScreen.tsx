import React from "react";
import AuthForm from "../components/AuthForm";

const SignUpScreen = ({ navigation }) => {
  return (
    <AuthForm
      title="Create an Account"
      buttonText="Sign Up"
      promptText="Already have an account?"
      switchText="Login"
      onSwitch={() => navigation.navigate("LoginScreen")}
      onSubmit={() => navigation.navigate("LoginScreen")}
      isSignUp={true}
    />
  );
};

export default SignUpScreen;

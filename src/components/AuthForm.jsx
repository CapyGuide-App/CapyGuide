import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

const AuthForm = ({
  title,
  buttonText,
  switchText,
  onSwitch,
  onSubmit,
  isSignUp = false,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
{isSignUp && (
        <View style={styles.inputContainer}>
          <TextInput placeholder="Name" style={styles.input} />
        </View>
      )}

      {isSignUp && (
        <View style={styles.inputContainer}>
          <TextInput placeholder="Email address" style={styles.input} />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput placeholder="Username" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <Eye color="#f5a623" size={20} />
          ) : (
            <EyeOff color="#f5a623" size={20} />
          )}
        </TouchableOpacity>
      </View>

      {isSignUp && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Check Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Eye color="#f5a623" size={20} />
            ) : (
              <EyeOff color="#f5a623" size={20} />
            )}
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or {isSignUp ? "sign up" : "log in"} with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/google.png")} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/apple.png")} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/facebook.png")} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.switchText} onPress={onSwitch}>
        {switchText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9F0",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5A623",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F5A623",
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#F5A623",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#aaa",
    fontSize: 14,
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  socialButton: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  switchText: {
    color: "#F5A623",
    fontSize: 14,
    marginTop: 20,
  },
});

export default AuthForm;

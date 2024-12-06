import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { hexToRGBA } from "../styles/Methods";
import { useTheme } from "@rneui/themed";
import { useAuth } from "../context/AuthContext";
import { fetchGoogleLogin } from "../request/DataRequest";

interface AuthFormProps {
  title: string;
  buttonText: string;
  promptText: string;
  switchText: string;
  onSwitch: () => void;
  isSignUp?: boolean;
  onSubmit: (formData: {
    username: string;
    password: string;
    email: string;
    displayName: string;
    confirmPassword: string;
  }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  promptText,
  switchText,
  onSwitch,
  isSignUp = false,
  onSubmit,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    displayName: "",
    confirmPassword: "",
  });
  const {login} = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const { theme } = useTheme();
  const placeholderTextColor = hexToRGBA(theme.colors.primary, 0.3);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    onSubmit(formData);
  };

  const handleGoogleLogin = async () => {
    try {
      await fetchGoogleLogin();
      login();
    } catch (error: Error | any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {isSignUp && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(value) => handleChange("displayName", value)}
            value={formData.displayName}
          />
        </View>
      )}

      {isSignUp && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(value) => handleChange("email", value)}
            value={formData.email}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor={placeholderTextColor}
          onChangeText={(value) => handleChange("username", value)}
          value={formData.username}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          placeholderTextColor={placeholderTextColor}
          onChangeText={(value) => handleChange("password", value)}
          value={formData.password}
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
            placeholder="Confirm Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            value={formData.confirmPassword}
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      {!isSignUp && <Text style={styles.orText}>
        or sign in with
      </Text>}

      {!isSignUp && (
        <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Image
            source={require("../assets/google.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Image
              source={require("../assets/facebook.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Image
              source={require("../assets/apple.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inlineContainer}>
        <Text style={styles.promptText}>{promptText} </Text>
        <Text style={styles.switchText} onPress={onSwitch}>
          {switchText}
        </Text>
      </View>
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
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptText: {
    color: "#F5A623",
    fontSize: 16,
    marginTop: 20,
  },
  switchText: {
    color: "#F5A623",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default AuthForm;

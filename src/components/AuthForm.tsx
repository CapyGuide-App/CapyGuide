import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  Keyboard,
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
  const [focusedFields, setFocusedFields] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleFocus = (fieldName: string) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: true }));
  };
  
  const handleBlur = (fieldName: string) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: false }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const { theme } = useTheme();
  // const placeholderTextColor = hexToRGBA(theme.colors.primary, 0.3);
  const placeholderTextColor = "#aaa";

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

  const styles = dynamicStyles(theme);

  return (
    <ImageBackground
      source={require('../assets/capy1.jpg')}
      style={styles.background}
      imageStyle={styles.image}>
      <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>

        {(!isSignUp || !isKeyboardVisible) && (
          <View style={styles.inlineContainer}>
            <Text style={styles.promptText}>{promptText} </Text>
            <Text style={styles.switchText} onPress={onSwitch}>
              {switchText}
            </Text>
          </View>
        )}

        {isSignUp && (
          <View
            style={[
              styles.inputContainer,
              focusedFields["name"] && styles.inputContainerOnSelected,
            ]}
          >
            <TextInput
              placeholder="Name"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              onChangeText={(value) => handleChange("displayName", value)}
              value={formData.displayName}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
            />
          </View>
        )}

        {isSignUp && (
          <View
            style={[
              styles.inputContainer,
              focusedFields["email"] && styles.inputContainerOnSelected,
            ]}
          >
            <TextInput
              placeholder="Email address"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              onChangeText={(value) => handleChange("email", value)}
              value={formData.email}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
            />
          </View>
        )}

        <View
          style={[
            styles.inputContainer,
            focusedFields["username"] && styles.inputContainerOnSelected,
          ]}
        >
          <TextInput
            placeholder="Username"
            style={styles.input}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(value) => handleChange("username", value)}
            value={formData.username}
            onFocus={() => handleFocus("username")}
            onBlur={() => handleBlur("username")}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            focusedFields["password"] && styles.inputContainerOnSelected,
          ]}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(value) => handleChange("password", value)}
            value={formData.password}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Eye color="#000" size={20} />
            ) : (
              <EyeOff color="#666" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {isSignUp && (
          <View
            style={[
              styles.inputContainer,
              focusedFields["confirm"] && styles.inputContainerOnSelected,
            ]}
          >
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              value={formData.confirmPassword}
              onFocus={() => handleFocus("confirm")}
              onBlur={() => handleBlur("confirm")}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <Eye color="#000" size={20} />
              ) : (
                <EyeOff color="#666" size={20} />
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

        {/* {!isKeyboardVisible && (
          <View style={styles.inlineContainer}>
            <Text style={styles.promptText}>{promptText} </Text>
            <Text style={styles.switchText} onPress={onSwitch}>
              {switchText}
            </Text>
          </View>
        )} */}
      </View>
    </ImageBackground>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
  background: {
    flex: 1, // Phủ toàn bộ màn hình
  },
  image: {
    opacity: 0.4, // Điều chỉnh độ mờ của ảnh nền
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 2,
    // borderColor: "#F5A623",
    borderColor: "#D8D8D8",
    // borderColor: "#C5C5C8",
    // borderColor: "#3D90CF",
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  inputContainerOnSelected: {
    borderColor: "#3D90CF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: theme.colors.primary,
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
    color: "#333",
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
    position: 'absolute',
    bottom: 0,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  promptText: {
    color: "#0b0b0b",
    fontSize: 16,
    marginTop: 20,
  },
  switchText: {
    color: theme.colors.primary,
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default AuthForm;

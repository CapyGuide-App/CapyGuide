import React, { createContext, useState, useContext, useEffect } from "react";
import KeychainService from "../utils/KeychainService";
import SessionManager from "../utils/SessionManager";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fetchProfile } from "../request/DataRequest";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null);

  const socialLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {}
  }

  const login = async () => {
    const tokens = await KeychainService.getTokens();
    if (tokens?.refreshToken) {
      console.log(tokens);
      setIsUserLoggedIn(true);
    }
  };

  const logout = () => {
    setIsUserLoggedIn(false);
    KeychainService.clearTokens();
    SessionManager.clearUserSession();
    socialLogout();
  };

  useEffect(() => {
    const init = async () => {
      await login();
    };
    init();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      const fetchUser = async () => {
        const user = await fetchProfile();
        setCurrentUser(user);
      };
      fetchUser();
    } else {
      setCurrentUser(null);
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    const validateToken = async () => {
      const tokens = await KeychainService.getTokens();
      if (tokens?.accessToken) {
        const decodedToken = JSON.parse(atob(tokens.accessToken.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp < currentTime) {
          logout(); // Log out the user
        }
      }
    };
  
    const interval = setInterval(() => {
      if (isUserLoggedIn) {
        validateToken();
      }
    }, 60000); // Check every 60 seconds
  
    return () => clearInterval(interval);
  }, [isUserLoggedIn]);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

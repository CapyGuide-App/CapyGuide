import React, { createContext, useState, useContext, useEffect } from "react";
import KeychainService from "../utils/KeychainService";
import SessionManager from "../utils/SessionManager";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 

  const login = async () => {
    const tokens = await KeychainService.getTokens();
    if (tokens?.refreshToken) {
      setIsUserLoggedIn(true);
    }
  };

  const logout = () => {
    setIsUserLoggedIn(false);
    KeychainService.clearTokens();
    SessionManager.clearUserSession();
  };

  useEffect(() => {
    const init = async () => {
      await login();
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

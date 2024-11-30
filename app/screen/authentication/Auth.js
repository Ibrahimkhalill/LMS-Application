import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const username = await AsyncStorage.getItem("username");
      const roles = await AsyncStorage.getItem("roles");
      if (username && roles) {
        setLoggedIn(true);
        setRole(roles);
      }
    };
    checkAuthentication();
  }, []);

  const login = async (username, roles, discount) => {
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("roles", roles);
    if (discount) {
      await AsyncStorage.setItem("discount", discount);
    }
    setLoggedIn(true);
    setRole(roles);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("roles");
    setLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

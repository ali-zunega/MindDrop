import { useState } from "react";
import { AuthContext } from "./authContext";
import {
  initUsers,
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    initUsers();
    return getCurrentUser();
  });

  const login = (credentials) => {
    const result = loginUser(credentials);
    if (result.success) setUser(result.user);
    return result;
  };

  const register = (userData) => {
    const result = registerUser(userData);
    if (result.success) setUser(result.user);
    return result;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

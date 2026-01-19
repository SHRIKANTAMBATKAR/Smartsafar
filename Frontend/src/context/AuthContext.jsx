import { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return {
      token,
      role: localStorage.getItem("role"),
      userId: localStorage.getItem("userId"),
      name: localStorage.getItem("name")
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      const { token, role, userId, name } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);

      setUser({ token, role, userId, name });
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Registration failed";
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

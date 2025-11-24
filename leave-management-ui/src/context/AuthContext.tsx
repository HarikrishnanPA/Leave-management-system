// src/context/AuthContext.tsx

import { createContext, useState } from "react";
import type { ReactNode } from "react";
import api from "@/api/axios";

interface AuthContextType {
  user: any;
  token: string | null;
  role: string | null;
  login: (userData: any) => void;
  logout: () => void;
  fetchProfile: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
  fetchProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState<any>({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    userId: localStorage.getItem("userId"),
  });

  const login = (userData: any) => {
    setToken(userData.token);
    setRole(userData.role);
    setUser({
      name: userData.name,
      email: userData.email,
      userId: userData.userId,
    });

    // Persist
    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("name", userData.name);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("userId", String(userData.userId));
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.clear();
  };

  const fetchProfile = async () => {
    const res = await api.get("/debug/me");
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

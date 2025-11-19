import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  role: string | null;
  login: (userData: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (userData: any) => {
    setToken(userData.token);
    setUser(userData.user);
    setRole(userData.role);

    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.role);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

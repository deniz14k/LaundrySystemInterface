import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser]   = useState(() => (token ? jwtDecode(token) : null));

  const login = (tok) => {
    localStorage.setItem("token", tok);
    setToken(tok);
    setUser(jwtDecode(tok));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) setUser(jwtDecode(token));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

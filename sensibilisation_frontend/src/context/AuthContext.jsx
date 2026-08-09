import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin } from "../services/api";
import {
  getToken,
  getStoredUser,
  setSession,
  clearSession,
} from "../services/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (getToken() && !user) setUser(getStoredUser());
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);
    setErreur(null);
    try {
      const { token, user: connectedUser } = await apiLogin(username, password);
      setSession(token, connectedUser);
      setUser(connectedUser);
      return connectedUser;
    } catch (err) {
      setErreur(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, erreur, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un <AuthProvider>",
    );
  return ctx;
}

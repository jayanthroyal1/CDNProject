import { createContext, useState, useEffect } from "react";

import {
  loginApi,
  logoutApi,
  refreshApi,
  getCurrentUserApi,
} from "../shared/api/auth.api";
import { setToken } from "../shared/api/interceptors";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await loginApi({
      email,
      password,
    });
    setAccessToken(response.data.accessToken);
    setToken(response.data.accessToken);
    const me = await getCurrentUserApi();
    setUser(me.data);
    return response;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // Ignore errors — we still want to clear local state
    }
    setToken(null);
    setUser(null);
    setAccessToken(null);
  };

  const initializeAuth = async () => {
    try {
      const refresh = await refreshApi();
      setAccessToken(refresh.data.accessToken);
      setToken(refresh.data.accessToken);
      const me = await getCurrentUserApi();
      setUser(me.data);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        setAccessToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

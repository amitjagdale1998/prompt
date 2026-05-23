import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('promptlab-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('promptlab-token'));
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const syncAuth = async () => {
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem('promptlab-token', token);
        try {
          const response = await axios.get('/api/auth/me');
          setUser(response.data.user);
        } catch {
          setUser(null);
          setToken(null);
          delete axios.defaults.headers.common.Authorization;
          localStorage.removeItem('promptlab-token');
        }
      } else {
        delete axios.defaults.headers.common.Authorization;
        localStorage.removeItem('promptlab-token');
      }
      setAuthReady(true);
    };

    syncAuth();
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('promptlab-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('promptlab-user');
    }
  }, [user]);

  const register = async (profile) => {
    const response = await axios.post('/api/auth/register', profile);
    return response.data;
  };

  const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const verifyAccount = async (verificationToken) => {
    const response = await axios.post('/api/auth/verify', { token: verificationToken });
    return response.data;
  };

  const forgotPassword = async (email) => {
    const response = await axios.post('/api/auth/forgot-password', { email });
    return response.data;
  };

  const resetPassword = async ({ email, token: resetToken, password }) => {
    const response = await axios.post('/api/auth/reset-password', {
      email,
      token: resetToken,
      password,
    });
    return response.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, authReady, login, logout, register, verifyAccount, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

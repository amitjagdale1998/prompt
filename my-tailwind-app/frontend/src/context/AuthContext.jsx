import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('promptlab-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('promptlab-token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('promptlab-token', token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem('promptlab-token');
    }
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

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, verifyAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

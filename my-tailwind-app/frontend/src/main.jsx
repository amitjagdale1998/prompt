import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import 'antd/dist/reset.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useThemeMode } from './context/ThemeContext';
import './index.css';

function Providers() {
  const { isDark } = useThemeMode();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#00ED64',
          colorSuccess: '#00ED64',
          colorWarning: '#F9C74F',
          colorError: '#FF5A5F',
          colorInfo: '#4DA3FF',
          borderRadius: 12,
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        },
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Providers />
    </ThemeProvider>
  </React.StrictMode>
);

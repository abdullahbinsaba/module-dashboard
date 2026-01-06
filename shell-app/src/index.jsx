import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <ThemeProvider> {/* Wrap App with ThemeProvider */}
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);


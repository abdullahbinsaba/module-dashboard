import React, { memo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme
import './Navbar.css';

const Navbar = memo(() => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Use theme context

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Micro-Frontend Dashboard</h2>
      </div>
      <div className="navbar-user">
        <span>Welcome, {user?.name}</span>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
});

export default Navbar;


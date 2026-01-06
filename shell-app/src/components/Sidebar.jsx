import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import './Sidebar.css';

const Sidebar = memo(() => {
  const location = useLocation();
  const { user } = useAuth(); // Get user from AuthContext

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['user', 'admin'] },
    { path: '/tasks', label: 'Tasks', icon: '✅', roles: ['user', 'admin'] },
    { path: '/analytics', label: 'Analytics', icon: '📈', roles: ['admin'] },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          // Only render if user has the required role(s)
          (item.roles.includes(user?.role) || !item.roles) && (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        ))}
      </nav>
    </aside>
  );
});

export default Sidebar;


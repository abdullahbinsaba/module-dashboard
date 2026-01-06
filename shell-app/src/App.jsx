import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load micro-frontends
const AuthApp = React.lazy(() => import('authApp/AuthApp'));
const DashboardApp = React.lazy(() => import('dashboardApp/DashboardApp'));
const TasksApp = React.lazy(() => import('tasksApp/TasksApp'));
const AnalyticsApp = React.lazy(() => import('analyticsApp/AnalyticsApp'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();

  // Show loading while auth is being initialized
  if (loading) {
    return <div className="loading">Loading application...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app">
        {isAuthenticated && <Navbar />}
        <div className="app-body">
          {isAuthenticated && <Sidebar />}
          <main className="main-content">
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <ErrorBoundary>
                      {isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                      ) : (
                        <AuthApp />
                      )}
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <DashboardApp user={user} logout={logout} />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <TasksApp user={user} logout={logout} />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <AnalyticsApp user={user} logout={logout} />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;


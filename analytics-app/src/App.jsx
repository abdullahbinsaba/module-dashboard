import React, { useMemo } from 'react';
import useAnalytics from './hooks/useAnalytics';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './App.css';

const COLORS = ['#3498db', '#27ae60', '#f39c12', '#e74c3c'];

const AnalyticsApp = ({ user, logout }) => {
  const { stats, loading, error } = useAnalytics();

  // Prepare data for charts using useMemo for performance optimization
  const taskStatusData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Completed', value: stats.completedTasks },
      { name: 'Pending', value: stats.pendingTasks },
    ];
  }, [stats]);

  const barChartData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Total Users', value: stats.totalUsers },
      { name: 'Total Tasks', value: stats.totalTasks },
      { name: 'Completed', value: stats.completedTasks },
      { name: 'Pending', value: stats.pendingTasks },
    ];
  }, [stats]);

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!stats) {
    return <div className="error">No analytics data available</div>;
  }

  return (
    <div className="analytics-app">
      <h1>Analytics Dashboard</h1>

      <div className="stats-summary">
        <div className="stat-box">
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-title">Total Users</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.totalTasks}</div>
          <div className="stat-title">Total Tasks</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.completedTasks}</div>
          <div className="stat-title">Completed Tasks</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.pendingTasks}</div>
          <div className="stat-title">Pending Tasks</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Task Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Overview Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsApp;


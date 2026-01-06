import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const useTasks = (filters = {}, sortBy = 'created_at', sortOrder = 'desc') => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }

      const params = {
        ...filters,
        sortBy,
        sortOrder,
      };

      const response = await axios.get(`${API_URL}/tasks`, { params });
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, sortOrder]);

  const addTask = useCallback(async (taskData) => {
    setError(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      fetchTasks(); // Refresh tasks after adding
      return { success: true, task: response.data.task };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add task');
      console.error('Error adding task:', err);
      return { success: false, error: err.response?.data?.error || 'Failed to add task' };
    }
  }, [fetchTasks]);

  const updateTask = useCallback(async (id, taskData) => {
    setError(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
      fetchTasks(); // Refresh tasks after updating
      return { success: true, task: response.data.task };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
      console.error('Error updating task:', err);
      return { success: false, error: err.response?.data?.error || 'Failed to update task' };
    }
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id) => {
    setError(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks(); // Refresh tasks after deleting
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
      console.error('Error deleting task:', err);
      return { success: false, error: err.response?.data?.error || 'Failed to delete task' };
    }
  }, [fetchTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask };
};

export default useTasks;

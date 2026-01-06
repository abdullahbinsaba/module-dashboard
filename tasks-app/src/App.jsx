import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useTasks from './hooks/useTasks';
import './App.css';
import './App-filters.css';

const TasksApp = ({ user, logout }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
  });
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask } = useTasks(filters, sortBy, sortOrder);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    setCurrentPage(1); // Reset page when filters/sort change
  }, [filters, sortBy, sortOrder]);

  const handleFilterChange = useCallback((e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSortChange = useCallback((e) => {
    const [field, order] = e.target.value.split('-');
    setSortBy(field);
    setSortOrder(order);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ title: '', description: '', status: 'pending' });
    setEditingTask(null);
    setShowForm(false);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    let result;
    if (editingTask) {
      result = await updateTask(editingTask.id, formData);
    } else {
      result = await addTask(formData);
    }

    if (result.success) {
      resetForm();
    } else {
      alert(result.error);
    }
  }, [formData, editingTask, addTask, updateTask, resetForm]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    const result = await deleteTask(id);
    if (!result.success) {
      alert(result.error);
    }
  }, [deleteTask]);

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
    });
    setShowForm(true);
  }, []);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = useMemo(() => tasks.slice(indexOfFirstTask, indexOfLastTask), [tasks, indexOfFirstTask, indexOfLastTask]);
  const totalPages = useMemo(() => Math.ceil(tasks.length / tasksPerPage), [tasks, tasksPerPage]);

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="tasks-app">
      <div className="tasks-header">
        <h1>Tasks</h1>
        {(user?.role === 'admin' || user?.role === 'user') && (
          <button onClick={() => setShowForm((prev) => !prev)} className="btn-primary">
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>
        )}
      </div>

      <div className="tasks-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="search-filter">Search:</label>
          <input
            id="search-filter"
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by title or description"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select
            id="sort-by"
            value={`${sortBy}-${sortOrder}`}
            onChange={handleSortChange}
          >
            <option value="created_at-desc">Date (Newest)</option>
            <option value="created_at-asc">Date (Oldest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="status-asc">Status (A-Z)</option>
            <option value="status-desc">Status (Z-A)</option>
          </select>
        </div>
      </div>

      {showForm && (
        <div className="task-form-card">
          <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter task title"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter task description"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingTask ? 'Update Task' : 'Create Task'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div className="empty-state">No tasks found. Create your first task!</div>
        ) : (
          <>
            {currentTasks.map((task) => (
              <div key={task?.id || Math.random()} className="task-card">
                <div className="task-header">
                  <h3>{task?.title || 'Untitled Task'}</h3>
                  <span className={`status-badge status-${task?.status || 'pending'}`}>
                    {task?.status || 'pending'}
                  </span>
                </div>
                {task?.description && (
                  <p className="task-description">{task.description}</p>
                )}
                <div className="task-actions">
                  {(user?.role === 'admin' || task?.user_id === user?.id) && (
                    <button
                      onClick={() => handleEdit(task)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                  )}
                  {(user?.role === 'admin' || task?.user_id === user?.id) && (
                    <button
                      onClick={() => handleDelete(task?.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TasksApp;
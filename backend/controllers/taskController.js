const Task = require('../models/Task');

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const { status, search, sortBy, sortOrder } = req.query;
    const filters = { status, search };
    const tasks = await Task.findAll(req.user.id, filters, sortBy, sortOrder);
    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const taskId = await Task.create(title, description, status, req.user.id);
    const task = await Task.findById(taskId, req.user.id);

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const updated = await Task.update(id, title, description, status, req.user.id);
    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await Task.findById(id, req.user.id);
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.delete(id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


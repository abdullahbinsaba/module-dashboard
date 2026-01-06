const Task = require('../models/Task');
const pool = require('../config/database');

// Get analytics overview
exports.getOverview = async (req, res) => {
  try {
    // Get total users
    const [userRows] = await pool.execute('SELECT COUNT(*) as total FROM users');
    const totalUsers = userRows[0].total;

    // Get task statistics
    const taskStats = await Task.getStats();
    const totalTasks = taskStats.total_tasks || 0;
    const completedTasks = taskStats.completed_tasks || 0;

    res.json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


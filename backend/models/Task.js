const pool = require('../config/database');

class Task {
  // Get all tasks for a user with filters, search, and sorting
  static async findAll(userId, filters = {}, sortBy = 'created_at', sortOrder = 'desc') {
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const queryParams = [userId];

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      query += ' AND status = ?';
      queryParams.push(filters.status);
    }
    if (filters.search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      queryParams.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    // Apply sorting
    const validSortBy = ['created_at', 'title', 'status'];
    const validSortOrder = ['asc', 'desc'];
    const finalSortBy = validSortBy.includes(sortBy) ? sortBy : 'created_at';
    const finalSortOrder = validSortOrder.includes(sortOrder) ? sortOrder : 'desc';

    query += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;

    const [rows] = await pool.execute(query, queryParams);
    return rows;
  }

  // Get task by ID
  static async findById(id, userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0];
  }

  // Create a new task
  static async create(title, description, status, userId) {
    const [result] = await pool.execute(
      'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
      [title, description, status || 'pending', userId]
    );
    return result.insertId;
  }

  // Update a task
  static async update(id, title, description, status, userId) {
    const [result] = await pool.execute(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
      [title, description, status, id, userId]
    );
    return result.affectedRows > 0;
  }

  // Delete a task
  static async delete(id, userId) {
    const [result] = await pool.execute(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  // Get task statistics
  static async getStats() {
    const [rows] = await pool.execute(`
      SELECT 
        COUNT(*) as total_tasks,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_tasks
      FROM tasks
    `);
    return rows[0];
  }
}

module.exports = Task;


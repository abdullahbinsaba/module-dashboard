-- Example Database Content
-- This file shows what the database looks like with sample data

USE dashboard_db;

-- ============================================
-- EXAMPLE USERS TABLE DATA
-- ============================================
-- Note: Passwords are bcrypt hashed
-- Example password "password123" = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

-- Sample Users (you can insert these after creating users via registration)
-- The password hash below is for "password123"
INSERT INTO users (name, email, password, role) VALUES
('John Doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user'),
('Jane Smith', 'jane@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user'),
('Admin User', 'admin@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin')
ON DUPLICATE KEY UPDATE name=name;

-- ============================================
-- EXAMPLE TASKS TABLE DATA
-- ============================================
-- Sample Tasks (assuming user_id 1 exists)

INSERT INTO tasks (title, description, status, user_id) VALUES
('Complete Project Documentation', 'Write comprehensive documentation for the micro-frontend dashboard project', 'in-progress', 1),
('Setup Database Schema', 'Create MySQL database tables for users and tasks', 'completed', 1),
('Implement Authentication', 'Add JWT authentication with access and refresh tokens', 'completed', 1),
('Build Dashboard Component', 'Create dashboard micro-frontend with user stats', 'pending', 1),
('Add Task Management', 'Implement CRUD operations for tasks', 'in-progress', 1),
('Create Analytics Charts', 'Build analytics micro-frontend with Recharts', 'pending', 1),
('Review Code Quality', 'Perform code review and fix any issues', 'pending', 2),
('Deploy Application', 'Deploy the application to production server', 'pending', 2),
('Write Unit Tests', 'Create unit tests for backend API endpoints', 'pending', 2),
('Optimize Performance', 'Optimize database queries and frontend rendering', 'in-progress', 2)
ON DUPLICATE KEY UPDATE title=title;

-- ============================================
-- VIEW EXAMPLE DATA
-- ============================================

-- View all users (without passwords)
SELECT id, name, email, role, created_at FROM users;

-- View all tasks with user information
SELECT 
    t.id,
    t.title,
    t.description,
    t.status,
    t.user_id,
    u.name as user_name,
    u.email as user_email,
    t.created_at,
    t.updated_at
FROM tasks t
JOIN users u ON t.user_id = u.id
ORDER BY t.created_at DESC;

-- View task statistics
SELECT 
    COUNT(*) as total_tasks,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
    SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as in_progress_tasks,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_tasks
FROM tasks;

-- View tasks by user
SELECT 
    u.name as user_name,
    COUNT(t.id) as task_count,
    SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) as completed_count
FROM users u
LEFT JOIN tasks t ON u.id = t.user_id
GROUP BY u.id, u.name;


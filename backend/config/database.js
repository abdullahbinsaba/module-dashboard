const mysql = require('mysql2/promise');

// Database configuration (without database name for initial connection)
const baseConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const dbName = process.env.DB_NAME || 'dashboard_db';

// Function to create database if it doesn't exist
async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection(baseConfig);
    
    // Create database if not exists
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' ready`);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    throw error;
  }
}

// Function to create tables if they don't exist
async function createTablesIfNotExist() {
  const dbConfig = {
    ...baseConfig,
    database: dbName
  };

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Create users table
    // Using VARCHAR(191) for email to avoid "key too long" error with utf8mb4
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(191) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready');

    // Create tasks table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Tasks table ready');

    await connection.end();
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  }
}

// Initialize database and tables
async function initializeDatabase() {
  try {
    await createDatabaseIfNotExists();
    await createTablesIfNotExist();
    console.log('✅ Database initialization complete');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
}

// Create connection pool with database
const pool = mysql.createPool({
  ...baseConfig,
  database: dbName
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connection pool ready');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection pool error:', err.message);
  });

// Export pool and initialization function
module.exports = pool;
module.exports.initializeDatabase = initializeDatabase;


const mysql = require('mysql2/promise');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',  
  user: 'root',
  password: 'root',
  database: 'tasks'
});

// Initialize database
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

// Get all tasks
const getAllTasks = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return rows;
  } catch (error) {
    throw error;
  }
};

// Create a new task
const createTask = async (title, description) => {
  try {
    const [result] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  initializeDatabase,
  getAllTasks,
  createTask
};

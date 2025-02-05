const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.resolve(__dirname, '../../tasks.db');
const db = new sqlite3.Database(dbPath);

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

const createTask = (title, description) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');
    stmt.run([title, description], function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
    stmt.finalize();
  });
};

module.exports = {
  initializeDatabase,
  getAllTasks,
  createTask
};
const express = require('express');
const { getAllTasks, createTask } = require('../database/db');
const router = express.Router();

/**
 * GET /tasks
 * Retrieve all tasks
 */
router.get('/', async (req, res, next) => {
  try {
    const tasks = await getAllTasks();
    res.json({
      status: 'success',
      data: tasks
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /tasks
 * Create a new task
 * Required body: { title: string, description: string }
 */
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    // Validate input
    if (!title) {
      return res.status(400).json({
        status: 'error',
        message: 'Title is required'
      });
    }

    const taskId = await createTask(title, description);
    res.status(201).json({
      status: 'success',
      message: 'Task Created Successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
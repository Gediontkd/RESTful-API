# Task Management API

A simple RESTful API for managing tasks built with Node.js, Express.js, and SQLite.

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd RESTful-API/
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   
For development with auto-reload:
```bash
npm run dev
```

The server will start on port 3000 by default. The SQLite database will be created automatically as `tasks.db` in the root directory.


## API Documentation

### GET /tasks
Retrieves all tasks.

**Response Format:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the task management API",
      "created_at": "2024-02-05T10:00:00.000Z"
    }
  ]
}
```

### POST /tasks
Creates a new task.

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description"
}
```

**Response Format:**
```json
{
  "status": "success",
  "message": "Task Created Successfully",
}
```

## Project Structure

```
├── src/
│   ├── index.js          # Application entry point
│   ├── database/
│   │   └── db.js         # Database configuration and queries
│   └── routes/
│       └── taskRoutes.js # API routes
├── tasks.db              # SQLite database file
├── package.json
└── README.md
```

## Technical Details

- Framework: Express.js
- Database: SQLite
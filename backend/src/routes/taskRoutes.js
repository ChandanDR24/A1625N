const express = require("express");
const { createTask, getTasks, updateTask, deleteTask,assignTasks } = require("../controllers/taskController");
const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.post("/tasks/assign",assignTasks);

module.exports = router;

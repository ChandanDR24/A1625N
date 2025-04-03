const Task = require("../models/Task");
const axios = require("axios");
const Employee = require("../models/Employee");

const GOOGLE_VERTEX_AI_URL = "Add the vertex api key here";
const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";

// Task Allocation Controller
exports.assignTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { status: "pending" } });
    const employees = await Employee.findAll();

    let assignments = [];

    for (let task of tasks) {
      let bestMatch = null;
      let highestScore = 0;

      for (let employee of employees) {
        const taskSkills = task.required_skills.split(",").map(s => s.trim());
        const employeeSkills = employee.skills.split(",").map(s => s.trim());

        // Call Google Vertex AI for skill matching
        const response = await axios.post(
          GOOGLE_VERTEX_AI_URL,
          {
            instances: [{ required_skills: taskSkills.join(" "), employee_skills: employeeSkills.join(" ") }]
          },
          { headers: { "Authorization": `Bearer ${GOOGLE_API_KEY}` } }
        );

        const predictionScore = response.data.predictions[0];

        if (predictionScore > highestScore) {
          highestScore = predictionScore;
          bestMatch = employee;
        }
      }

      if (bestMatch) {
        assignments.push({ task: task.id, assignedTo: bestMatch.id, score: highestScore });
        await Task.update({ status: "assigned", assigned_to: bestMatch.id }, { where: { id: task.id } });
      }
    }

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error assigning tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.update(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

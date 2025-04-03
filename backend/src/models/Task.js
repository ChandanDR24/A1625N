const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  required_skills: {
    type: DataTypes.STRING, // Stores required skills (comma-separated)
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending",
  }
});

sequelize.sync({ alter: true })
  .then(() => console.log("✅ Task Model Synced!"))
  .catch(err => console.error("❌ Task Model Sync Error:", err));

module.exports = Task;

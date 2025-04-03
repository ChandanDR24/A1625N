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
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending",
  }
});

sequelize.sync()
  .then(() => console.log("✅ Task Model Synced!"))
  .catch(err => console.error("❌ Task Model Sync Error:", err));

module.exports = Task;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability_status: {
    type: DataTypes.ENUM("available", "busy", "on-leave"),
    defaultValue: "available",
  },
  skills: {
    type: DataTypes.STRING, // Stores required skills (comma-separated)
    allowNull: false,
  }
});

sequelize.sync({ alter: true })
  .then(() => console.log("✅ Employee Model Synced!"))
  .catch(err => console.error("❌ Employee Model Sync Error:", err));

module.exports = Employee;

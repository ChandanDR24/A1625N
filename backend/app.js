const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

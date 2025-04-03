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
app.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === "admin") {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

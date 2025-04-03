import React, { useState, useEffect } from "react";
import TaskList from "../components/taskList";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, CircularProgress, Alert } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleAssignTasks = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/tasks/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to assign tasks");
      }

      const result = await response.json();
      setMessage(`✅ Successfully assigned ${result.length} tasks`);
    } catch (error) {
      setMessage("❌ Error assigning tasks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically hide message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3500);

      return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
    }
  }, [message]);

  return (
    <Container maxWidth={false} style={{ width: "100vw", padding: "20px" }}>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="#333" color="white">
        <Typography variant="h4">Admin Dashboard</Typography>

        <Box display="flex" gap={2}>
          {/* Assign Tasks Button */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAssignTasks} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Assign Tasks"}
          </Button>

          {/* Logout Button */}
          <Button variant="contained" onClick={handleLogout} color="error">
            Logout
          </Button>
        </Box>
      </Box>

      {/* Message Alert (Disappears after 5 seconds) */}
      {message && (
        <Box mt={2}>
          <Alert severity={message.includes("Error") ? "error" : "success"}>
            {message}
          </Alert>
        </Box>
      )}

      {/* Task List */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Task List
        </Typography>
        <TaskList />
      </Box>

      
    </Container>
  );
};

export default Dashboard;

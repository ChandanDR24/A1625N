import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Card, Box } from "@mui/material";

const Login = ({ setAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      setAuthenticated(true);
      navigate("/dashboard");
    } else {
      setError("Invalid password! Only the admin can log in.");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1122",
      }}
    >
      <Card sx={{ padding: "30px", textAlign: "center", width: 350, boxShadow: 3,backgroundColor: "#ddd" }}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <TextField
          label="Enter Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Card>
    </Box>
  );
};

export default Login;

import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
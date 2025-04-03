import { useEffect, useState } from "react";
import { fetchTasks } from "../services/api";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
      {tasks.map((task) => (
        <Card key={task.id}  sx={{ maxWidth: 300, m: 1,bgcolor: "#303030" ,color:"white"}}>
          <CardContent  >
            <Typography variant="h6">{task.description}</Typography>
            <Typography variant="body2" color="#666">
              Required Skills: {task.required_skills}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TaskList;

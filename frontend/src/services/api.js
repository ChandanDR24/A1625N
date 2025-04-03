import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

export const fetchEmployees = async () => {
  const response = await axios.get(`${API_URL}/api/employees`);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/api/tasks`);
  return response.data;
};

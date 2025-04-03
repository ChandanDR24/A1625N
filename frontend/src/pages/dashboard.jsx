import React from "react";
import TaskList from "../components/taskList";
import EmployeeList from "../components/employeeList";


const Dashboard = () => {
  return (
    <div className="w-full container">
      <h1 className="text-2xl font-bold">Task Allocation Dashboard</h1>
      <h2 className="text-xl font-bold p-4">Employee List</h2>
      <TaskList />
      <EmployeeList />
    </div>
  );
};

export default Dashboard;

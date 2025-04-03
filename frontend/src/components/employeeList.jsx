import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees().then(setEmployees);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} className="border p-2 my-2 rounded">
            {employee.name} (Skills: {employee.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;

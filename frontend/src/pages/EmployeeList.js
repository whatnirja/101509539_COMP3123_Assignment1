import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EmployeeList() {
  
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/emp/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to fetch employees. Please try again later.");
    }
  };
    
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await api.delete(`/emp/employees?eid=${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Employee List</h1>

      <button onClick={() => navigate("/employees/add")} style={{ marginBottom: "20px" }}>
        Add Employee
      </button>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>{new Date(emp.date_of_joining).toLocaleDateString()}</td>

              <td>
                <button onClick={() => navigate(`/employees/${emp.employee_id}`)}>
                  View
                </button>

                <button onClick={() => navigate(`/employees/${emp.employee_id}/edit`)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(emp.employee_id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

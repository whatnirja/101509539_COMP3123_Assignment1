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
      setEmployees(employees.filter(e => e.employee_id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again later.");
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    }}>
    {employees.map(emp => (
      <div 
        key={emp.employee_id} 
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          width: "250px"
        }}
      >
        {emp.profile_picture && (
          <img 
            src={`http://localhost:8080/uploads/${emp.profile_picture}`} 
            alt="profile"
            style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
          />
        )}

        <h3>{emp.first_name} {emp.last_name}</h3>
        <p>{emp.position}</p>
        <p>{emp.department}</p>

        <button onClick={() => navigate(`/employees/${emp.employee_id}`)}>
          View
        </button>
        <button onClick={() => navigate(`/employees/edit/${emp.employee_id}`)}>
          Edit
        </button>
        <button onClick={() => handleDelete(emp.employee_id)}>
          Delete
        </button>
      </div>
      ))}
    </div>

  );
};

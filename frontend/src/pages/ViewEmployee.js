import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ViewEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try { 
        const response = await api.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        navigate("/employees");
      }
    };

    fetchEmployee();
  }, [id, navigate]);
  if (!employee) {
    return <div>Loading...</div>;
  }
  
  return (
    <div style={{ padding: "40px" }}>
      <h1>Employee Details</h1>

      {employee.profile_picture && (
        <img
          src={`http://localhost:8080/uploads/${employee.profile_picture}`}
          alt="Profile"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        />
      )}

      <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Salary:</strong> {employee.salary}</p>
      <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toDateString()}</p>

      <br/>

      <button onClick={() => navigate(`/employees/edit/${employee.employee_id}`)}>
        Edit
      </button>

      &nbsp;&nbsp;

      <button onClick={() => navigate("/employees")}>
        Back
      </button>
    </div>
  )
}
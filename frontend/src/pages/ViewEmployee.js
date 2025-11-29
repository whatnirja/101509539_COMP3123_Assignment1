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
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="page view-employee-page">

      <div className="employee-card">

        <h1 className="title">Employee Details</h1>

        {employee.profile_picture && (
          <div className="photo-wrapper">
            <img
              className="employee-photo"
              src={`http://localhost:8080/uploads/${employee.profile_picture}`}
              alt="Profile"
            />
          </div>
        )}

        <div className="details-grid">
          <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toDateString()}</p>
        </div>

        <div className="actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/employees/edit/${employee.employee_id}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/employees")}
          >
            Back
          </button>
        </div>

      </div>

    </div>
  );
}
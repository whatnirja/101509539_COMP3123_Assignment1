import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/emp/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();

      if (department) params.append("department", department);
      if (position) params.append("position", position);

      const response = await api.get(`/emp/search?${params.toString()}`);
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await api.delete(`/emp/employees?eid=${id}`);
      setEmployees(employees.filter(e => e.employee_id !== id));
    } catch (err) {
      alert("Failed to delete employee.");
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


  return (
    <div className="page">
      <h1>Employees</h1>

      {/* Search Filters */}
      <div className="search-wrapper">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Search by Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        <button className="btn btn-secondary" onClick={fetchEmployees}>Clear</button>
        <button className="btn btn-primary" onClick={() => navigate("/employees/add")}>
          Add Employee
        </button>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id}>
              <td>
                {emp.profile_picture ? (
                  <img
                    className="employee-img"
                    src={`http://localhost:8080/uploads/${emp.profile_picture}`}
                    alt="profile"
                  />
                ) : (
                  "—"
                )}
              </td>

              <td>{emp.first_name} {emp.last_name}</td>

              <td>{emp.email}</td>

              <td>{emp.position}</td>

              <td>{emp.department}</td>

              <td>${emp.salary}</td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/employees/${emp.employee_id}`)}
                >
                  View
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/employees/edit/${emp.employee_id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(emp.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button className="btn btn-secondary" onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}>
        Logout
      </button>

    </div>
  );

}

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

  return (
    <div style={{ padding: "40px" }}>
      <h1>Employees</h1>

      {/* Search Filters */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />{" "}
        &nbsp;
        <input
          type="text"
          placeholder="Search by Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />{" "}
        &nbsp;
        <button onClick={handleSearch}>Search</button>
        &nbsp;
        <button onClick={fetchEmployees}>Clear</button>
        &nbsp;&nbsp;
        <button onClick={() => navigate("/add-employee")}>Add Employee</button>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left"
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Photo</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Name</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Email</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Position</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Department</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Salary</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id}>
              <td style={{ padding: "10px" }}>
                {emp.profile_picture ? (
                  <img 
                    src={`http://localhost:8080/uploads/${emp.profile_picture}`}
                    alt="profile"
                    style={{ width: "60px", height: "60px", borderRadius: "5px", objectFit: "cover" }}
                  />
                ) : (
                  "—"
                )}
              </td>

              <td style={{ padding: "10px" }}>
                {emp.first_name} {emp.last_name}
              </td>

              <td style={{ padding: "10px" }}>
                {emp.email}
              </td>

              <td style={{ padding: "10px" }}>
                {emp.position}
              </td>

              <td style={{ padding: "10px" }}>
                {emp.department}
              </td>

              <td style={{ padding: "10px" }}>
                ${emp.salary}
              </td>

              <td style={{ padding: "10px" }}>
                <button onClick={() => navigate(`/employees/${emp.employee_id}`)}>View</button>
                &nbsp;
                <button onClick={() => navigate(`/employees/edit/${emp.employee_id}`)}>Edit</button>
                &nbsp;
                <button onClick={() => handleDelete(emp.employee_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

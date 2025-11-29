import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try{
        const response = await api.get(`/emp/employees/${id}`);
        const empData = response.data;

        setForm({
          first_name: empData.first_name,
          last_name: empData.last_name,
          email: empData.email,
          position: empData.position,
          salary: empData.salary,
          date_of_joining: empData.date_of_joining,
          department: empData.department
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
        alert("Failed to load employee data.");
        navigate("/employees");
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    if (file) {
      formData.append("image", file);
    }

    try {
      await api.put(`/emp/employees/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Employee updated successfully!");
      navigate(`/employees/${id}`);
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    }
  }

  return (
    <div className="page edit-employee-page">

      <div className="employee-card">

        <h1>Edit Employee</h1>

        <form onSubmit={handleSubmit} className="edit-form">

          <div className="form-grid">
            <input
              type="text"
              className="form-control"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
            />

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control"
              name="position"
              placeholder="Position"
              value={form.position}
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control"
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={handleChange}
            />

            <input
              type="date"
              className="form-control"
              name="date_of_joining"
              value={form.date_of_joining}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
            />
          </div>

          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />

          <div className="actions">
            <button type="submit" className="btn btn-primary">Update</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/employees/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );

}

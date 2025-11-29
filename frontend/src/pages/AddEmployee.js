import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddEmployee() {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (file) {
        formData.append("image", file);
      }

      await api.post("/emp/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Employee added successfully!");
      navigate("/employees");

    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again later.");
    }

  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add Employee</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
        /><br/><br/>

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        /><br/><br/>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br/><br/>

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
        /><br/><br/>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        /><br/><br/>

        <input
          type="date"
          name="date_of_joining"
          value={form.date_of_joining}
          onChange={handleChange}
        /><br/><br/>

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        /><br/><br/>

        <input type="file" onChange={handleFileChange} /><br/><br/>

        <button type="submit">Create</button>
      </form>

      <br />
      <button onClick={() => navigate("/employees")}>Back</button>
    </div>
  );
}
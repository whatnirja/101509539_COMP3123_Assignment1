import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/signup", form);

      alert("Signup successful! You can now log in.");
      navigate("/");

    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Check your input and try again.");
    }
  };

  return (
    <div className="page">
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          value={form.username}
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
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>

      <br/>

      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Back to Login
      </button>
    </div>
  );
}

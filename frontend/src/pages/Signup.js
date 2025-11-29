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
    <div style={{ padding: "40px" }}>
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
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
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        /><br/><br/>

        <button type="submit">Create Account</button>
      </form>

      <br/>

      <button onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);

      localStorage.setItem("token", response.data.jwt_token);

      navigate("/employees");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email or Username"
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

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <br/>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/signup")}
      >
        Go to Signup
      </button>
    </div>
  );
}

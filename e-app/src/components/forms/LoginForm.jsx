import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Login form component - handles user login
export default function LoginForm() {
  // State to store email and password input
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  // Get login function and error from auth context
  const { login, error } = useAuth();

  // Handle form submission - validate and login user
  const handleSubmit = (e) => {
    e.preventDefault();
    login(form).then((user) => {
      // If login successful, redirect to user's dashboard based on role
      if (user) {
        navigate(`/dashboard/${user.role}`);
      }
    });
  };

  return (
    <form className="card p-4 shadow" onSubmit={handleSubmit}>
      <h3>Login</h3>
      {/* Show error message if login fails */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Email input field */}
      <div className="input-group mb-2">
        <span className="input-group-text">
          <i className="bi bi-envelope"></i>
        </span>
        <input
          className="form-control"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      {/* Password input field */}
      <div className="input-group mb-2">
        <span className="input-group-text">
          <i className="bi bi-lock"></i>
        </span>
        <input
          className="form-control"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>

      {/* Login button */}
      <button className="btn btn-success mt-3 w-100">Login</button>
    </form>
  );
}

//this component is used in Login.jsx
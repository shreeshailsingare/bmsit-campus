import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [role, setRole] = useState("User");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        {
          role,
          name,
          username,
          password,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/login"); 
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-dark d-flex justify-content-center align-items-center">
      <div
        className="card text-light shadow-lg border-0"
        style={{ maxWidth: "400px", width: "100%", backgroundColor: "#1e1e1e" }}
      >
        <div data-bs-theme="dark" className="d-flex justify-content-end mt-3 me-3">
          <Link to="/" type="button" className="btn-close" aria-label="Close" />
        </div>

        <div className="card-body p-4">
          <h3 className="text-center fw-bold mb-2">Sign Up</h3>

          <form onSubmit={signUp}>
            <div className="mb-3">
              <label className="form-label text-secondary">Role</label>
              <select
                className="form-select bg-dark text-light border-secondary"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary">Full Name</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary">Username</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                className="form-control bg-dark text-light border-secondary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 mt-2 text-white"
              style={{ backgroundColor: "#ff5722" }}
            >
              Sign Up
            </button>

            <div className="d-flex align-items-center justify-content-around mt-3">
              <p className="mb-0">Already have an account?</p>
              <Link to="/login" className="text-info text-decoration-none">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

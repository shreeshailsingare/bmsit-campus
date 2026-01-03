import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useFlash } from "../../Context/FlashContext";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const { setFlash } = useFlash();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/login",
        { username, password }
      );

      localStorage.setItem("token", response.data.token);
      login(response.data.user);
      navigate("/");

      setFlash({
      type: "success",
      message: "Login successfully"
    });
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
        setFlash({
      type: "danger",
      message: err.response?.data?.error || "Failed to delete post"
    });
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-dark d-flex justify-content-center align-items-center">
      <div className="card text-light shadow-lg border-0" style={{ maxWidth: "400px", width: "100%", backgroundColor: "#1e1e1e" }}>
        <div data-bs-theme="dark" className="d-flex justify-content-end mt-3 me-3">
          <Link to="/" type="button" className="btn-close" aria-label="Close" />
        </div>

        <div className="card-body p-4">
          <h3 className="text-center fw-bold mb-4">Login</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-secondary">Username</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary">Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#ff5722" }}>
              Login
            </button>

            <div className="d-flex align-items-center justify-content-around mt-3">
              <p className="mb-0">Don't have an account?</p>
              <Link to="/signup" className="text-info text-decoration-none">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

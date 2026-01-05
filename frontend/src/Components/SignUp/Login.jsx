import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useFlash } from "../../Context/FlashContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { setFlash } = useFlash();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
      setFlash({type: "success",message: "Login successful",});
      navigate("/");
    } catch (err) {
      setFlash({type: "danger", message: err.response?.data?.error || "Login failed",});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100  d-flex justify-content-center align-items-center">
      <div
        className="card text-light shadow-lg border-0"
        style={{ maxWidth: "400px", width: "100%", backgroundColor: "#1e1e1e" }}
      >
        <div data-bs-theme="dark" className="d-flex justify-content-end mt-3 me-3">
          <Link to="/" className="btn-close" />
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

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: "#ff5722" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="d-flex justify-content-around mt-3">
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

import React, { useContext,useState  } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./SignUp/AuthContext";
import { useFlash } from "../Context/FlashContext";
import './Navbar.css'

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { setFlash } = useFlash();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    setFlash({ type: "success", message: "Logged out successfully" });
  };


  return (
    <nav className="navbar-row">
      <div className="navbar-container">
        
        
        <Link className="nav-logo" to="/">
          <span className="text-danger">BMSIT</span> <span className="text-primary">Campus</span>
        </Link>

  
        <div className="nav-actions">
          {user ? (
            <button
              className="nav-btn-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-btn-outline">
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
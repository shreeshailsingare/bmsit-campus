import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/SignUp/AuthContext";
import { useFlash } from "../Context/FlashContext";

function Footer() {
  const { user } = useContext(AuthContext);
  const { setFlash } = useFlash();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!user) {
      setFlash({
        type: "warning",
        message: "Please login to view your profile 🔐",
      });
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="container border-top border-secondary border-opacity-50 text-white fixed-bottom " style={{ height: "53px",backgroundColor:'black' }}>
      <div className="row h-100 align-items-center text-center">
        <div className="col">
          <Link className="navbar-brand fs-5" to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>

        <div className="col">
          <Link className="navbar-brand fs-5" to="/display">
            <i className="fa-solid fa-display"></i>
          </Link>
        </div>

        <div className="col">
          <Link className="navbar-brand fs-5" to="/filter">
            <i className="fa-solid fa-filter"></i>
          </Link>
        </div>

        <div className="col">
          <button
            onClick={handleProfileClick}
            className="btn btn-link text-white fs-5 p-0"
          >
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

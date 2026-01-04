import React from "react";
import { useContext } from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "./SignUp/AuthContext";
import { useFlash } from "../Context/FlashContext";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
     const { user, logout } = useContext(AuthContext);
     const { setFlash } = useFlash();

       const handleLogout = () => {
            logout();

            setFlash({
            type: "success",
            message: "Logged out successfully "
            });
        };


    return(

    <nav className="navbar fixed-top text-white border-bottom border-secondary border-opacity-50 " style={{backgroundColor:'black'}}>
        <div className="container-fluid">
            <Link className="navbar-brand text-white fw-bold fs-2  nav-title" to="/">BMSIT Campus</Link>
              {user ? (
                    <button className="text-decoration-none text-white btn btn-outline-secondary btn-sm rounded-pill" onClick={handleLogout}>
                    Logout
                    </button>
                ) : (
                    <Link to="/login" className=" text-decoration-none pe-2 text-white btn btn-outline-secondary btn-sm rounded-pill">
                    Login
                    </Link>
                )}
                
        </div>
    </nav>
    )
};

export default Navbar;
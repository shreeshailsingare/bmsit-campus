import React from "react";
import { Link } from "react-router-dom";
import Event from "./Event";
import Posts from "./Posts";
import { useContext } from "react";
import { AuthContext } from "../SignUp/AuthContext";
import "./HomePage.css";

function HomePage({ setFlash }) {
    const { user } = useContext(AuthContext);
    const displayName = user?.name || user?.username || "Campus Explorer";

    return(
       <div className="welcome-screen">
         <Event />
         <Posts currentUser={user} setFlash={setFlash}/>
       </div>
    )
}

export default HomePage;

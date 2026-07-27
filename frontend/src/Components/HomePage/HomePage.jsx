// import React from "react";
// import Event from "./Event";
// import Posts from "./Posts";
// import PostButton from '../CreatePost/PostButton.jsx';
// import { useContext } from "react";
// import { AuthContext } from "../SignUp/AuthContext";

// function HomePage({ setFlash }) {
//     const { user } = useContext(AuthContext);
//     console.log("ROLE FROM UI:", user?.role);


//     return(
//        <>
//        <Event/>
//        <Posts currentUser={user} setFlash={setFlash}/>
//        </>
//     )
// }

// export default HomePage;

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
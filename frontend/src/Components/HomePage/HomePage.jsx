import React from "react";
import Event from "./Event";
import Posts from "./Posts";
import PostButton from '../CreatePost/PostButton.jsx';
import { useContext } from "react";
import { AuthContext } from "../SignUp/AuthContext";

function HomePage({ setFlash }) {
    const { user } = useContext(AuthContext);
    console.log("ROLE FROM UI:", user?.role);


    return(
       <>
       <Event/>
       <Posts currentUser={user} setFlash={setFlash}/>
  
             {user?.role?.toLowerCase() === "admin" && <div className="d-block d-lg-none">
  <PostButton /></div>}
       </>
    )
}

export default HomePage;
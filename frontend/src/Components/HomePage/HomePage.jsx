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
  
             {user?.role?.toLowerCase() === "admin" && <PostButton />}
       </>
    )
}

export default HomePage;
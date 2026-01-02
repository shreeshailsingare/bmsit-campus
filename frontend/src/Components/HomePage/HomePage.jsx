import React from "react";

import Event from "./Event";
import Posts from "./Posts";
import PostButton from '../CreatePost/PostButton.jsx';

function HomePage({ currentUser, setFlash }) {
    return(
       <>
       <Event/>
       <Posts currentUser={currentUser} setFlash={setFlash}/>
       <PostButton currentUser={currentUser}/>
       </>
    )
}

export default HomePage;
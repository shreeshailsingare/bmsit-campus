import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem";

function Posts({ currentUser, setFlash }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const updatePost = (updatedPost) => {
    setPosts(prev =>
      prev.map(p => p._id === updatedPost._id ? updatedPost : p)
    );
  };

  return (
    <div className="pb-5 mt-3 border-top border-secondary">
      {posts.map(post => (    
        <PostItem key={post._id}   post={post} onPostUpdate={updatePost} currentUser={currentUser} setFlash={setFlash} />
      ))}
    </div>
  );
}

export default Posts;

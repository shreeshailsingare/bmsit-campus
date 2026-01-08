import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem";

// function Posts({ currentUser, setFlash }) {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get("/posts")
//       .then(res => setPosts(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const updatePost = (updatedPost) => {
//     setPosts(prev =>
//       prev.map(p => p._id === updatedPost._id ? updatedPost : p)
//     );
//   };

//   return (
//     <div className="pb-5 mt-3 border-top border-secondary  border-opacity-50">
//       {posts.map(post => (    
//         <PostItem key={post._id}   post={post} onPostUpdate={updatePost} currentUser={currentUser} setFlash={setFlash} />
//       ))}
//     </div>
//   );
// }

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

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p._id !== postId));
  };

  return (
    <div className="pb-5 mt-3 border-top border-secondary border-opacity-50">
      {posts.map(post => (
        <PostItem
          key={post._id}
          post={post}
          onPostUpdate={updatePost}
          onPostDelete={deletePost}
          currentUser={currentUser}
          setFlash={setFlash}
        />
      ))}
    </div>
  );
}


export default Posts;

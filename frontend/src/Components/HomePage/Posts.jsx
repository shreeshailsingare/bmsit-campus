import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem";

function SkeletonPost() {
  return (
    <div className="feed-card feed-skeleton">
      <div className="feed-card-content">
        <div className="feed-avatar-skeleton" />
        <div className="feed-skeleton-body">
          <div className="feed-skeleton-line w-40" />
          <div className="feed-skeleton-line w-60" />
          <div className="feed-skeleton-line w-80" />
          <div className="feed-skeleton-media" />
          <div className="feed-skeleton-actions">
            <div className="feed-skeleton-btn" />
            <div className="feed-skeleton-btn" />
            <div className="feed-skeleton-btn" />
            <div className="feed-skeleton-btn" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Posts({ currentUser, setFlash }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/posts")
      .then(res => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("[Posts] Failed to load posts:", err))
      .finally(() => setLoading(false));
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
    <div className="feed-container">
      {loading ? (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      ) : (
        <>
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
          <div className="feed-end">
            <span className="feed-end-line" />
            <span className="feed-end-text">You've reached the end</span>
            <span className="feed-end-line" />
          </div>
        </>
      )}
    </div>
  );
}

export default Posts;

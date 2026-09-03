import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useFlash } from "../../Context/FlashContext";

function PostActions({ postId, onPostDeleted }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setFlash } = useFlash();

  if (!postId) return null;

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen(prev => !prev);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onPostDeleted(postId);
      setOpen(false);
      setFlash({ type: "success", message: "Post deleted successfully" });
    } catch (err) {
      setFlash({ type: "danger", message: err.response?.data?.err || "Failed to delete post" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="feed-dropdown">
      <button className="feed-dropdown-trigger" onClick={handleToggle}>
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="feed-dropdown-menu">
          <Link
            to={`/editpost/${postId}`}
            className="feed-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <Pencil size={14} />
            <span>Edit</span>
          </Link>
          <button className="feed-dropdown-item feed-dropdown-danger" onClick={handleDelete}>
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default PostActions;

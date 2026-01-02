import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../../Context/FlashContext";



function PostActions({ postId, onPostDeleted }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { setFlash } = useFlash();

  


  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen(prev => !prev);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onPostDeleted(postId);
      setOpen(false);
         setFlash({
          type: "success",
          message: "Post deleted successfully"
        });
    } catch (err) {
      console.error(err);
      setFlash({
      type: "danger",
      message: err.response?.data?.error || "Failed to delete post"
    });

    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown position-relative">
      <button
        className="btn text-light border-0 p-0"
        onClick={handleToggle}
      >
        <i className="fa-solid fa-ellipsis-h"></i>

      </button>

      {open && (
        <ul
          className="dropdown-menu dropdown-menu-dark dropdown-menu-end show"
          style={{ position: "absolute", right: 0, zIndex: 1055 }}
        >
          <li>
            <Link
              to={`/editpost/${postId}`}
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              Edit
            </Link>
          </li>

          <li>
            <button
              className="dropdown-item text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default PostActions;

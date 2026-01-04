import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../../Context/FlashContext";

function EditPost() {
  const { id } = useParams();       
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setFlash } = useFlash();
  const [submitting, setSubmitting] = useState(false);

useEffect(() => {
  if (!id) {
    setFlash({
      type: "danger",
      message: "Invalid post ID"
    });
    navigate("/");
    return;
  }

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setText(res.data.text);
    } catch (err) {
      setFlash({
        type: "danger",
        message: "Failed to load post"
      });
    } finally {
      setLoading(false);
    }
  };

  fetchPost();
}, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
       setFlash({
          type: "danger",
          message: "Post text cannot be empty"
        });
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("media", file);

    try {
     await axios.put(`/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

      setFlash({
          type: "success",
          message: "Post updated successfully"
        });
      navigate("/");
    } catch (err) {
      console.error(err);
       setFlash({
          type: "danger",
          message: err.response?.data?.error || "Failed to update post"
        });
    }finally {
      setSubmitting(false);
    }
  };

    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

  return (
    <div className="container  min-vh-100 text-white pt-5">
      <form className="p-2" onSubmit={handleSubmit}>
        <div data-bs-theme="dark" className="d-flex justify-content-end">
          <Link to="/" className="btn-close"></Link>
        </div>

        <div className="mb-3">
          <label className="form-label">Edit text</label>
          <textarea
            className="form-control  bg-dark text-white border-secondary"        
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{height:'150px'}}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Update Image (optional)</label>
          <input
            type="file"
            className="form-control bg-dark text-white"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
             className="btn btn-primary mt-4 w-40"
             type="submit"
             disabled={submitting}
            >
        {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
                Updating...
            </>
            ) : (
                "Update"
              )}
            </button>

        </div>
      </form>
    </div>
  );
}

export default EditPost;

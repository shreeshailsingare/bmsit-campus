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

 useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);

      console.log("FULL RESPONSE:", res.data);
      setText(res.data.text);
        
    } catch (err) {
      console.error(err);
       setFlash({
          type: "danger",
          message: err.response?.data?.error || "Failed to create post"
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
      alert("Post text cannot be empty");
      return;
    }


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
          message: err.response?.data?.error || "Failed to create post"
        });
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container bg-dark min-vh-100 text-white pt-5">
      <form className="p-4" onSubmit={handleSubmit}>
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
          <button className="btn btn-primary mt-4 w-40" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;

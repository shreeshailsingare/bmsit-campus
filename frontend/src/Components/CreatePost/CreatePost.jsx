import { Link,useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useFlash } from "../../Context/FlashContext";


function CreatePost() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const { setFlash } = useFlash();
  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("text", text);
  if (file) formData.append("media", file);

  try {
    setLoading(true); 

    const res = await axios.post(
      "/posts",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 0 
      }
    );

    setFlash({
      type: "success",
      message: "Post created successfully"
    });

    navigate("/");
  } catch (err) {
    setFlash({
      type: "danger",
      message: err.response?.data?.error || "Failed to create post"
    });
  } finally {
    setLoading(false); 
  }
};

  return (
    <div className="container  min-vh-100 text-white pt-5">
      <form onSubmit={handleSubmit} className="p-4">
        <div data-bs-theme="dark" className="d-flex justify-content-end">
          <Link to="/" className="btn-close"></Link>
        </div>

        <div className="mb-3">
          <label className="form-label">Enter text</label>
          <textarea
            className="form-control bg-dark text-white h-50"
            
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <input
          type="file"
          accept="image/*,video/*,application/pdf"
          className="form-control bg-dark text-white"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="d-flex justify-content-end align-items-center  w-100">
          <button
              className="btn btn-primary mt-4 w-50 d-flex px-3 align-items-center justify-content-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;

import { Link,useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useFlash } from "../../Context/FlashContext";


function CreatePost() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([]);

  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");

  const { setFlash } = useFlash();
  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("text", text);
  formData.append("category", category);
  formData.append("tags", tags);

  files.forEach((file) => {
    formData.append("media", file);
  });


  try {
    setLoading(true); 

    const res = await axios.post("/posts", formData,
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
    <div className="container  min-vh-60  ">
      <form onSubmit={handleSubmit} className="p-4">
        <div data-bs-theme="dark" className="d-flex justify-content-end">
          <Link to="/" className="btn-close"></Link>
        </div>

        <div className="mb-3">
          <label className="form-label">Enter text</label>
          <textarea
            className="form-control bg-dark text-light h-50 "
            
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">
              Category
          </label>

          <select
              className="form-select bg-dark text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
          >

              <option>General</option>
              <option>Placement</option>
              <option>Internship</option>
              <option>Department</option>
              <option>Event</option>
              <option>Hackathon</option>
              <option>Sports</option>
              <option>Club</option>
              <option>Library</option>
              <option>Announcement</option>
              <option>Achievement</option>

          </select>
      </div>

      <div className="mb-3">

          <label className="form-label">
              Tags
          </label>

          <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="amazon,sde,internship"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
          />

      </div>

       

        <input
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          className="form-control bg-dark text-white"
          onChange={(e) => setFiles([...e.target.files])}
        />


        <div className="d-flex justify-content-end align-items-center gap-2 w-100">
          <Link
            to="/"
            className="btn btn-outline-secondary mt-4 w-50 d-flex px-3 align-items-center justify-content-center"
          >
            Cancel
          </Link>
          
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

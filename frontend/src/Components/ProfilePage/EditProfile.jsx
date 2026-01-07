import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../../Context/FlashContext";

function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const { setFlash } = useFlash();

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get("/auth/me", {headers: { Authorization: `Bearer ${token}`,},})
      .then((res) => {
        setName(res.data.name || "");
        setUsername(res.data.username || "");
        setProfileImageUrl(
          res.data.profile_image?.url || ""
        );
        setLoading(false);
      })
      .catch((err) => {
        // console.error(err);
        alert("Failed to load profile");
        etFlash({type: "danger", message: err.response?.data?.error || "Login failed",});
      });
  }, [token]);
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  try {
    await axios.put("/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setFlash({ type: "success", message: "Profile updated successfully" });

    navigate("/profile");
  } catch (err) {
    console.error(err);
     setFlash({
      type: "danger",
      message: err.response?.data?.error || "Failed to update profile"
    });
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return <p className="text-center text-white mt-5">Loading...</p>;
  }

  return (
    <div className="  min-vh-100">
      <div className="container mt-5 d-flex justify-content-center">
        <div
          className=" border-0 mt-5 overflow-hidden"
          style={{ maxWidth: "600px", width: "100%" }}
        >

            <div className="container text-center">
              <img
                  src={
                    profileImageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                  className="rounded-circle"
                  width="130"
                  height="130"
                  style={{ objectFit: "cover" }}
              />

           </div>
       
          <div className="  pt-4 px-4 pb-4 ">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-light opacity-75 small fw-bold">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control text-white bg-dark"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light opacity-75 small fw-bold">
                  Profile Image
                </label>
               <input
                  type="file"
                  className="form-control bg-dark text-white"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProfileImage(file);

                    if (file) {
                      setProfileImageUrl(URL.createObjectURL(file));
                    }
                  }}
                />

              </div>

              <div className="d-flex justify-content-end mt-4 border-top pt-3">
               <button
                  type="submit"
                  className="btn btn-primary rounded-pill fw-bold px-4"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>


                <Link
                  to="/profile"
                  className="btn btn-secondary ms-2 rounded-pill fw-bold px-4"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

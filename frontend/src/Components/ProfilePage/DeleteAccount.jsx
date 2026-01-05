import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../../Context/FlashContext";

function DeleteAccount() {
  const { setFlash } = useFlash();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      " This will permanently delete your account. Are you sure?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("/user/account", {headers: { Authorization: `Bearer ${token}`, },});
      localStorage.removeItem("token");
      setFlash({type: "success",message: "Your account has been deleted."});
      navigate("/login");
    } catch (err) {
      setFlash({type: "danger",message: err.response?.data?.error || "Failed to delete account"});
    }
  };

  return (
    <div className="container  min-vh-100 text-white d-flex align-items-center justify-content-center">
      <div className="card bg-dark text-white p-4" style={{ maxWidth: "500px" }}>
        <h4 className="text-danger mb-3">Delete Account</h4>
        <p>
          This action is <strong>permanent</strong>. All your data will be removed
          and cannot be recovered.
        </p>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link to="/profile" className="btn btn-secondary">
            Cancel
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;

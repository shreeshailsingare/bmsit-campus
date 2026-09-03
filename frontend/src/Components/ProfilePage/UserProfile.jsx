import React, { useContext } from "react";
import {Link} from "react-router-dom";
import './UserProfile.css'
import { AuthContext } from "../SignUp/AuthContext.jsx";

const guestUser = {
  name: "Guest_User",
  username: "guest",
  profile_image: {
    url: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  }
};

function ProfilePage() { 
  const { user: authUser } = useContext(AuthContext);
  const user = authUser || guestUser;

  return (
    <div className="container    min-vh-60 mt-0   ">
       {/* FOR MOBILE */}
       <div className="profile-page">
      <div className="row justify-content-center text-dark text-center mt-5 mb-4 ">
        <div className="col-12">
          <img
            src={user.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            className="rounded-circle mb-2"
            width="125"
            height="125"
            alt="profile"
          />
          
          <h5 className="fw-bold mb-0">{user.name }</h5>
          <p className="">@{user.username }</p>       
         
        </div>
      </div>

      <div className="row justify-content-center ">
        <div className="col-12 col-md-6 ">
         <div className="list-group list-group-flush  " >
          <Link
              to="/profile/saved"
              className="list-group-item text-dark border-0"
              style={{backgroundColor:'#F5F8FA' }}
            >
              <i className="fa-regular fa-folder me-2"></i>
              Saved Posts
            </Link>

            <Link to='/profile/edit' className="list-group-item border-0  text-dark "style={{backgroundColor:'#F5F8FA' }}>
                <i className="fa-regular fa-pen-to-square me-2"> </i>
                 Edit 
            </Link>
            
            <Link to='/profile/delete' className="list-group-item border-0 text-dark " style={{backgroundColor:'#F5F8FA' }}>
                <i className="fa-solid fa-trash pe-2"></i>
                Delete Account
            </Link>
          </div>

        </div>
      </div>
      </div>

  {/* FOR DESKTOP */}
       <div className="row text-dark   Desktop-profile-page">
        <div className="cover-banner"></div>
        <div className="row mb-2 profile-header-row">
          <div className="col-5 profile-picture-col">
            <img
              src={user.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"  }
              className="rounded-circle profile-picture"
              width="120"
              height="120"
              alt="profile"
            />
          </div>

          <div className="col-6 p-2 profile_list">
            <h5 className="fw-bold mb-0 w-100">{user.name}</h5>
            <p className="mb-0">@{user.username}</p>
            <p className="mb-0 small text-muted">{user.department || "Department"}</p>
            <p className="mb-0 small text-muted">{user.college || "BMSIT Campus"}</p>
            <div className="mt-2">
              <Link to="/profile/edit" className="btn btn-primary btn-sm rounded-pill fw-bold px-3">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-4 profile-stats-row">
          <div className="col-3">
            <div className="profile-stat-card text-center">
              <h4 className="fw-bold mb-1">{user.posts || 0}</h4>
              <p className="mb-0 text-muted small">Posts</p>
            </div>
          </div>
          <div className="col-3">
            <div className="profile-stat-card text-center">
              <h4 className="fw-bold mb-1">{user.saved_posts || 0}</h4>
              <p className="mb-0 text-muted small">Saved Posts</p>
            </div>
          </div>
          <div className="col-3">
            <div className="profile-stat-card text-center">
              <h4 className="fw-bold mb-1">{user.likes || 0}</h4>
              <p className="mb-0 text-muted small">Likes</p>
            </div>
          </div>
          <div className="col-3">
            <div className="profile-stat-card text-center">
              <h4 className="fw-bold mb-1">{user.achievements || 0}</h4>
              <p className="mb-0 text-muted small">Achievements</p>
            </div>
          </div>
        </div>

        <div className="row mt-4 profile-tabs-row">
          <div className="col-12">
            <ul className="nav nav-tabs profile-tabs">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Posts</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/saved" className="nav-link">Saved Posts</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Activity</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">Achievements</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <div className="create-post-card">
              <Link
                to="/createpost"
                className="composer-avatar"
                aria-label="Create post"
              >
                <img
                  src={user.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="avatar"
                />
              </Link>
              <Link
                to="/createpost"
                className="composer-input"
                aria-label="What's happening?"
              >
                What's happening?
              </Link>
              <Link
                to="/createpost"
                className="btn btn-primary rounded-pill fw-bold px-4 composer-post-btn"
              >
                Post
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;

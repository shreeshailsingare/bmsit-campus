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

  const handleThemeToggle = () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

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
            <button type="button" onClick={handleThemeToggle} className="list-group-item text-dark text-start border-0 theme-toggle-btn" style={{backgroundColor:'#F5F8FA' }}>
                <i className="fa-solid fa-circle-half-stroke pe-2"></i>
                Theme
            </button>
          </div>

        </div>
      </div>
      </div>

 {/* FOR DESKTOP */}
      <div className="row text-dark   Desktop-profile-page">
        <div className="row mb-2">
        <div className="col-5">
          <img
            src={user.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"  }
            className="rounded-circle mb-2"
            width="80"
            height="80"
            alt="profile"
          />
        </div>

          <div className="col-6 p-2 profile_list">
          <h5 className="fw-bold mb-0  w-100">{user.name}</h5>
          <p className="">@{user.username }</p>       
          <div/>
          
        </div>
      </div>

        <div className="row mt-3">
          <div className="col-12 justify-content-start text-start fs-4 d-flex flex-column " >
            <Link className=" fs-4 text-dark text-decoration-none p-2 sidebar-links  " to="/">
              <i className="fa-solid fa-house pe-4"> </i> 
             <span className="profile_list">Home</span> 
            </Link>

            <Link className="fs-4 text-dark text-decoration-none p-2 sidebar-links " to="/placementnews">
               <i className="fa-solid fa-briefcase pe-4"></i>
                <span className="profile_list">Placement </span>
            </Link>

            <Link className="fs-4 text-dark text-decoration-none p-2 sidebar-links " to="/filter">
               <i className="fa-solid fa-filter pe-4"></i>
                <span className="profile_list">Filter</span>
            </Link>
              
              {user.username !== "guest" && (
                <>
                  <Link to="/profile/saved" className="text-dark text-decoration-none p-2 sidebar-links">
                    <i className="fa-regular fa-folder pe-4"></i>
                    <span className="profile_list">Saved Posts</span>
                  </Link>

                  <Link to="/profile/edit" className="text-dark text-decoration-none p-2 sidebar-links">
                    <i className="fa-regular fa-pen-to-square pe-4"></i>
                    <span className="profile_list">Edit</span>
                  </Link>

                  <Link to="/profile/delete" className="text-dark text-decoration-none p-2 sidebar-links">
                    <i className="fa-solid fa-trash pe-4"></i>
                    <span className="profile_list">Delete</span>
                  </Link>
                </>
              )}
            
            <button type="button" onClick={handleThemeToggle} className="text-dark text-decoration-none p-2 sidebar-links theme-toggle-btn bg-transparent border-0 text-start">
            <i className="fa-solid fa-circle-half-stroke pe-4"></i>
             <span className="profile_list">Theme</span> 
            </button>

           {user && user.role === "Admin" && (
              <div className="d-flex justify-content-center mt-4 profile_list w-100">
                <Link type="button" className="btn btn-primary rounded-pill w-100" to="/createpost">
                  Post
                </Link>
              </div>
            )}
           
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProfilePage;

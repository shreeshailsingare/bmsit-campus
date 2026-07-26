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

function Desktop_ProfilePage() {
  const { user: authUser } = useContext(AuthContext);
  const user = authUser || guestUser;

  return (
    <div className="container    min-vh-100 mt-0   ">
 {/* FOR DESKTOP */}
      <div className="row text-white   Desktop-profile-page">
        <div className="row mb-2">
        <div className="col-6">
          <img
            src={user.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png" }
            
            className="rounded-circle mb-2"
            width="80"
            height="80"
            alt="profile"
          />
          </div>

          <div className="col-6 p-3 profile_list">
          <h5 className="fw-bold mb-0">{user.name}</h5>
          <p className="">@{user.username}</p>       
          <div/>
          
        </div>
      </div>

        <div className="row mt-3">
          <div className="col-12 justify-content-start text-start fs-4 d-flex flex-column " >
            <Link className=" fs-4 text-white text-decoration-none py-2 sidebar-link  " to="/">
              <i className="fa-solid fa-house pe-4"> </i> 
             <span className="profile_list">Home</span> 
            </Link>

            <Link className=" fs-4 text-white text-decoration-none py-2 sidebar-link" to="/profile">
              <i className="fa-solid fa-circle-user pe-4"></i> 
              <span className="profile_list">Profile</span> 
            </Link>

            <Link className="fs-4 text-white text-decoration-none py-2 sidebar-link " to="/filter">
               <i className="fa-solid fa-filter pe-4"></i>
                <span className="profile_list">Filter</span>
            </Link>
            
            <Link  to="/profile/saved" className="text-white text-decoration-none py-2 sidebar-link" >
              <i className="fa-regular fa-folder pe-4"></i>
              <span className="profile_list">Saved Posts</span>
            </Link>

            <Link to='/profile/delete' className="text-white text-decoration-none py-2 sidebar-link" >
                <i className="fa-solid fa-trash pe-4"></i>
                <span className="profile_list">Delete Account</span>
            </Link>
            
            <div className="d-flex justify-content-center mt-4 profile_list w-100">
              <button type="button" className="btn btn-light rounded-pill w-100">Post</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Desktop_ProfilePage;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './UserProfile.css'
import Desktop_ProfilePage from './LeftSidebar.jsx';

function ProfilePage() {
  // const [user, setUser] = useState(null); 
  const [user, setUser] = useState({
  name: "Guest_User",
  username: "guest",
  profile_image: {
    url: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  }
});

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   axios.get("/auth/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(res => setUser(res.data))
  //   .catch(err => console.log(err));
  // }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");

  // If no token → stay as guest
  if (!token) return;

  axios.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => {
    if (res.data) {
      setUser(res.data); // real logged-in user
    }
  })
  .catch(err => {
    console.log(err);
    // If error (token expired / not logged in) → fallback to guest
    setUser({
      name: "Guest_User",
      username: "guest",
      profile_image: {
        url: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
      }
    });
  });
}, []);

  //  if (!user) {
  //   return <p className="text-white text-center mt-5 pt-5">Please login to view your profile</p>;
  // }

  return (
    <div className="container    min-vh-60 mt-0   ">
       {/* FOR MOBILE */}
       <div className="profile-page">
      <div className="row justify-content-center text-white text-center mt-5 mb-4 ">
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
              className="list-group-item text-white border-0"
              style={{ backgroundColor: "black" }}
            >
              <i className="fa-regular fa-folder me-2"></i>
              Saved Posts
            </Link>

            <Link to='/profile/edit' className="list-group-item border-0  text-white "style={{backgroundColor:'black'}}>
                <i className="fa-regular fa-pen-to-square me-2"> </i>
                 Edit 
            </Link>
            
            <Link to='/profile/delete' className="list-group-item border-0 text-white " style={{backgroundColor:'black'}}>
                <i className="fa-solid fa-trash pe-2"></i>
                Delete Account
            </Link>
            <a href="#" className="list-group-item text-white  " style={{backgroundColor:'black'}}>
                <i className="fa-solid fa-circle-half-stroke pe-2"></i>
                Theme
            </a>
          </div>

        </div>
      </div>
      </div>

 {/* FOR DESKTOP */}
      <div className="row text-white   Desktop-profile-page">
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
            <Link className=" fs-4 text-white text-decoration-none p-2 sidebar-links  " to="/">
              <i className="fa-solid fa-house pe-4"> </i> 
             <span className="profile_list">Home</span> 
            </Link>

            <Link className=" fs-4 text-white text-decoration-none p-2 sidebar-links" to="/profile">
              <i className="fa-solid fa-circle-user pe-4"></i> 
              <span className="profile_list">Profile</span> 
            </Link>

            <Link className="fs-4 text-white text-decoration-none p-2 sidebar-links " to="/filter">
               <i className="fa-solid fa-filter pe-4"></i>
                <span className="profile_list">Filter</span>
            </Link>
            
            <Link  to="/profile/saved" className="text-white text-decoration-none p-2 sidebar-links" >
              <i className="fa-regular fa-folder pe-4"></i>
              <span className="profile_list">Saved Posts</span>
            </Link>

            <Link to='/profile/delete' className="text-white text-decoration-none p-2 sidebar-links" >
                <i className="fa-solid fa-trash pe-4"></i>
                <span className="profile_list">Delete </span>
            </Link>
            
            <Link to='/profile/theme' className="text-white text-decoration-none p-2 sidebar-links">
            <i className="fa-solid fa-circle-half-stroke pe-4"></i>
             <span className="profile_list">Theme</span> 
            </Link>
            <div className="d-flex justify-content-center mt-4 profile_list w-100 ">
              <Link type="button" className="btn btn-light rounded-pill w-100 " to="/createpost">
                Post
              </Link>
            </div>
          </div>

          {/* {user.role !== "guest" && <PostButton />} */}

        </div>
      </div>

    </div>
  );
}

export default ProfilePage;

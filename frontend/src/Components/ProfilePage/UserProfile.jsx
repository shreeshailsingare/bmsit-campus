import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:8080/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, []);

   if (!user) {
    return <p className="text-white text-center mt-5 pt-5">Loading...</p>;
  }

  return (
    <div className="container bg-dark   min-vh-100 mt-0 py-5 ">

      <div className="row justify-content-center text-white text-center mt-5 mb-4">
        <div className="col-12">
          <img
            src={user.profile_image?.url || "/image1.jpg"}
            className="rounded-circle mb-2"
            width="100"
            height="100"
            alt="profile"
          />
          
          <h5 className="fw-bold mb-0">{user.name}</h5>
          <p className="">@{user.username}</p>       
         
        </div>
      </div>

      <div className="row justify-content-center ">
        <div className="col-12 col-md-6 ">
         <div className="list-group list-group-flush ">
             <a href="#" className="list-group-item text-white bg-dark border-0">
                <i className="fa-regular fa-folder me-2"></i>
                Saved Post 

            </a>
            <Link to='/profile/edit' className="list-group-item border-0  text-white bg-dark">
                <i className="fa-regular fa-pen-to-square me-2"> </i>
                 Edit 
            </Link>
            
            <Link to='/profile/delete' className="list-group-item border-0 text-white bg-dark">
                <i className="fa-solid fa-trash pe-2"></i>
                Delete Account
            </Link>
            <a href="#" className="list-group-item text-white bg-dark ">
                <i className="fa-solid fa-circle-half-stroke pe-2"></i>
                Theme
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProfilePage;

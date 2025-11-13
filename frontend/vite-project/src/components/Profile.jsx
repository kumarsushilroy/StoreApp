import React from "react";
import { useSelector } from "react-redux";

import userlogo from "../assets/user.png";
import { FaUser, FaUserEdit, FaCloudUploadAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Profile = () => {

  const sidebarContent = [
    {
      path:'/me/profile',
      heading:'Profile',
      icon:<FaUser/>
    },
    {
      path:'/me/profile/update-profile',
      heading:'Update Profile',
      icon:<FaUserEdit />
    },
    {
      path:'/me/profile/upload-avatar',
      heading:'Upload Avatar',
      icon:<FaCloudUploadAlt />
    },
     {
      path:'/me/profile/update-password',
      heading:'Update Password',
      icon:<FaCloudUploadAlt />
    },
  ]

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div class="row justify-content-around mt-5 user-info">
        <div className="col-md-4">
        

          <Sidebar sidebarContent={sidebarContent} />
        </div>

        <div class="col-12 col-md-3">
          <figure class="avatar avatar-profile mt-4">
            <img
              class="rounded-circle img-fluid"
              src={user ? user.user.photo : userlogo}
              alt=""
            />
          </figure>
        </div>

        <div class="col-12 col-md-5">
          <h4>Full Name</h4>
          <p className="fw-bold">{user?.user.username}</p>

          <h4>Email Address</h4>
          <p className="fw-bold">{user?.user.email}</p>

          <h4>Joined On</h4>
          <p>2023-09-19</p>
        </div>

        <Outlet/>
      </div>
    </>
  );
};

export default Profile;

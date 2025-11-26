
import React from 'react'
import { Link } from 'react-router-dom'
import { logOut } from "../Store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({sidebarContent}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = ()=>{
    dispatch(logOut());
    navigate('/login')
  }
  return (
      <div
      className="d-flex flex-column p-3 text-white bg-dark"
      style={{ width: "250px", height: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      <h3 className="text-center mb-4">Dashboard</h3>

      <ul className="nav nav-pills flex-column mb-auto">

       {
        sidebarContent?.map((item,i)=>(
          <li key={i} className="nav-item mb-2">
          <Link to={item.path} className="nav-link text-white">
            <i className="bi bi-house-door-fill me-2">{item.icon}</i> {item.heading}
          </Link>
        </li>
        ))
       }
       
      </ul>

      <hr />

      <div className="mt-auto">
       
        <button onClick={handleLogOut} className="btn btn-danger w-100">
           Logout
        </button>
          
        
      </div>
    </div>
  )
}

export default Sidebar
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../Store/userSlice";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();

  const { user, error, loading, isAuthenticated } = useSelector((state) => state.user);

  console.log("USERRRR", user);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    dispatch(logOut());
    navigate('/login');
  };

 

  return (
    <div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  Logo
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Home
                      </a>
                    </li>

                    

                    {user && (
                      <li className="nav-item">
                        <button onClick={handleLogOut}>Logout</button>
                      </li>
                    )}

                  {!user && (<>

                    <li className="nav-item mr-3">
                      <Link to={"/login"}>Login</Link>
                    </li>
                     <li className="nav-item">
                      <Link to={"/register"}>Register</Link>
                    </li>

                    </>
                  )}

                  
                    

                   
                  </ul>

                  {user && (
                    <span className="d-flex justify-content-center align-items-center gap-2">
                      <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Account
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                      <p className="fw-40 d-flex gap-3">
                        <span className="fw-bold ">{user?.user?.username}</span>
                      </p>

                      <img
                        className="rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                        src={user?.user?.photo}
                        alt=""
                      />
                    </span>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

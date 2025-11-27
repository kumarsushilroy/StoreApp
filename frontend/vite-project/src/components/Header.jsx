import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../Store/userSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../Store/productSlice";
import logo from "../assets/companylogo.png";
import userlogo from "../assets/user.png";

const Header = () => {
  const dispatch = useDispatch();

  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [searchVal, setsearchVal] = useState("");

  let [searchParams] = useSearchParams();
  const keyword = searchParams.get("search");

  const params = { keyword };

  useEffect(() => {
    fetchProducts(params);
  }, [keyword]);

  const handleSearchProduct = (e) => {
    e.preventDefault();
    if (searchVal?.trim()) {
      navigate(`/?search=${searchVal}`);
    } else {
      navigate("/");
    }
  };

  const { cartItem } = useSelector((state) => state.cartSlice);

  console.log("USERRRR", user);
  console.log("cartItems== ", cartItem);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    //   <nav class="navbar row fixed" style={{width:'100%', zIndex:'2', top:'0', left:'0'}}>
    //   <div class="col-12 col-md-3 ps-5">
    //     <div class="navbar-brand">
    //       <a href="/">
    //         <img className="rounded" style={{width:'45px', border:'rounded'}} src={logo} alt="ShopIT Logo" />
    //       </a>
    //     </div>
    //   </div>
    //   <div class="col-12 col-md-4 mt-2 mt-md-0">
    //     <form  action="your_search_action_url_here" method="get">
    //       <div class="input-group">
    //         <input
    //           onChange={(e)=>setsearchVal(e.target.value)}
    //           type="text"
    //           id="search_field"
    //           aria-describedby="search_btn"
    //           class="form-control"
    //           placeholder="Enter Product Name ..."
    //           name="keyword"
    //           value={searchVal}
    //         />
    //         <button onClick={handleSearchProduct} id="search_btn" class="btn" type="submit">
    //           Search
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    //   <div class={`col-12 col-md-5 mt-4 mt-md-0 text-center`}>
    //     <button className="bg-success rounded" onClick={()=>navigate('/cart')} style={{textDecoration:'none'}}>
    //       <span id="cart" class="ms-3"> Cart </span>
    //       <span class="ms-1" id="cart_count">{cartItem?.length}</span>
    //     </button>

    //     <div class="ms-4 dropdown">
    //       <button
    //         class="btn dropdown-toggle text-white"
    //         type="button"
    //         id="dropDownMenuButton"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <figure class="avatar avatar-nav">
    //           <img
    //             src={user?user?.user?.photo:userlogo}
    //             alt=""
    //             className="rounded-circle"
    //           />
    //         </figure>
    //         <span>{user?.user?.username}</span>
    //       </button>
    //       <div class="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">

    //       {
    //         user?.user?.role=='admin' &&
    //         <Link class="dropdown-item" to="/admin/dashboard"> Dashboard </Link>
    //       }

    //         <Link class="dropdown-item" to="/user_orders"> Orders </Link>

    //         <Link class="dropdown-item" to="/me/profile"> Profile </Link>

    //         <button onClick={handleLogOut} class="dropdown-item text-danger" > Logout </button>
    //       </div>
    //     </div>

    //    {!user ?
    //      <Link to="/login" class="btn ms-4" id="login_btn"> Login </Link> :
    //      <button onClick={handleLogOut} id="login_btn" className="btn ms-4">Logout</button>
    //    }
    //   </div>
    // </nav>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 shadow-sm fixed">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="Logo"
            className="rounded"
            style={{ width: "45px", height: "45px", objectFit: "cover" }}
          />
          <span className="ms-2 fw-bold" style={{color:'orange'}}>ShopIT</span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}
          <form
            className="d-flex mx-auto my-2 my-lg-0"
            style={{ width: "50%" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search product..."
              value={searchVal}
              onChange={(e) => setsearchVal(e.target.value)}
            />
            <button
              onClick={handleSearchProduct}
              className="btn  ms-2"
              id='login_btn'
            >
              Search
            </button>
          </form>

          {/* Right Section */}
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Cart */}
            <li className="nav-item me-4">
              <button
                className="btn btn-success position-relative"
                onClick={() => navigate("/cart")}
              >
                Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItem?.length}
                </span>
              </button>
            </li>

            {/* User Dropdown */}
            {user ? (
              <li className="nav-item dropdown me-3">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  id="userMenuBtn"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={user?.user?.photo || userlogo}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="ms-2">{user?.user?.username}</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow">
                  {user?.user?.role === "admin" && (
                    <li>
                      <Link className="dropdown-item" to="/admin/dashboard">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link className="dropdown-item" to="/user_orders">
                      My Orders
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/me/profile">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

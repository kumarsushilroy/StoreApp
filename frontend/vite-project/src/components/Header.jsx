import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../Store/userSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../Store/productSlice";
import logo from '../assets/companylogo.png'
import userlogo from '../assets/user.png';

const Header = () => {

  const dispatch = useDispatch();
  

  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [searchVal , setsearchVal] = useState('');

  let [searchParams] = useSearchParams();
  const keyword = searchParams.get('search');

  const params = {keyword}

  useEffect(()=>{
    fetchProducts(params)
  },[keyword])

  const handleSearchProduct = (e)=>{
    e.preventDefault();
    if(searchVal?.trim()){
      navigate(`/?search=${searchVal}`)
    }else{
      navigate('/')
    }
  }

  const {cartItem} = useSelector((state)=>state.cartSlice)

  console.log("USERRRR", user);
  console.log('cartItems== ', cartItem)

  const navigate = useNavigate();

  const handleLogOut = async () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    // <div>
    //   <div className="container-fluid">
    //     <div className="row ">
    //       <div className="col-md-12">
    //         <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
    //           <div className="container-fluid">
    //             <a className="navbar-brand" href="#">
    //               Logo
    //             </a>
    //             <button
    //               className="navbar-toggler"
    //               type="button"
    //               data-bs-toggle="collapse"
    //               data-bs-target="#navbarSupportedContent"
    //               aria-controls="navbarSupportedContent"
    //               aria-expanded="false"
    //               aria-label="Toggle navigation"
    //             >
    //               <span className="navbar-toggler-icon"></span>
    //             </button>
    //             <div
    //               className="collapse navbar-collapse"
    //               id="navbarSupportedContent"
    //             >
    //               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //                 <li className="nav-item">
    //                   <a
    //                     className="nav-link active"
    //                     aria-current="page"
    //                     href="#"
    //                   >
    //                     Home
    //                   </a>
    //                 </li>

    //                 {user && (
    //                   <li className="nav-item">
    //                     <button onClick={handleLogOut}>Logout</button>
    //                   </li>
    //                 )}

    //                 {!user && (
    //                   <>
    //                     <li className="nav-item mr-3">
    //                       <Link to={"/login"}>Login</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                       <Link to={"/register"}>Register</Link>
    //                     </li>
    //                   </>
    //                 )}
    //               </ul>

    //               {user && (
    //                 <span className="d-flex justify-content-center align-items-center gap-2">
    //                   <li className="nav-item dropdown">
    //                     <a
    //                       className="nav-link dropdown-toggle"
    //                       href="#"
    //                       id="navbarDropdown"
    //                       role="button"
    //                       data-bs-toggle="dropdown"
    //                       aria-expanded="false"
    //                     >
    //                       Account
    //                     </a>
    //                     <ul
    //                       className="dropdown-menu"
    //                       aria-labelledby="navbarDropdown"
    //                     >
    //                       <li>
    //                         <Link to='/user_orders' className="dropdown-item" href="#">
    //                           My Orders
    //                         </Link>
    //                       </li>
    //                       <li>
    //                         <a className="dropdown-item" href="#">
    //                           Another action
    //                         </a>
    //                       </li>
    //                       <li>
    //                         <a className="dropdown-item" href="#">
    //                           Something else here
    //                         </a>
    //                       </li>
    //                     </ul>
    //                   </li>
    //                   <p className="fw-40 d-flex gap-3">
    //                     <span className="fw-bold ">{user?.user?.username}</span>
    //                   </p>

    //                   <img
    //                     className="rounded-circle"
    //                     style={{ width: "60px", height: "60px" }}
    //                     src={user?.user?.photo}
    //                     alt=""
    //                   />

    //                  <span className='btn rouded ' onClick={()=>navigate('/cart')}>
    //                   <span className="bg-warning p-2 rounded">Cart</span>
    //                   <span className="bg-success p-2 rounded text-white">{cartItem?.length}</span>
    //                   </span>
    //                 </span>
    //               )}
    //             </div>
    //           </div>
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    // </div>

      <nav class="navbar row position-fixed" style={{width:'100%', zIndex:'2', top:'0', left:'0'}}>
      <div class="col-12 col-md-3 ps-5">
        <div class="navbar-brand">
          <a href="/">
            <img style={{width:'56px', border:'rounded'}} src={logo} alt="ShopIT Logo" />
          </a>
        </div>
      </div>
      <div class="col-12 col-md-6 mt-2 mt-md-0">
        <form  action="your_search_action_url_here" method="get">
          <div class="input-group">
            <input
              onChange={(e)=>setsearchVal(e.target.value)}
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              class="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value={searchVal}
            />
            <button onClick={handleSearchProduct} id="search_btn" class="btn" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <button className="bg-success rounded" onClick={()=>navigate('/cart')} style={{textDecoration:'none'}}>
          <span id="cart" class="ms-3"> Cart </span>
          <span class="ms-1" id="cart_count">{cartItem?.length}</span>
        </button>

        <div class="ms-4 dropdown">
          <button
            class="btn dropdown-toggle text-white"
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure class="avatar avatar-nav">
              <img
                src={user?user?.user?.photo:userlogo}
                alt=""
                className="rounded-circle"
              />
            </figure>
            <span>{user?.user?.username}</span>
          </button>
          <div class="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">

          {
            user?.user?.role=='admin' &&
            <Link class="dropdown-item" to="/admin/dashboard"> Dashboard </Link>  
          }  

            <Link class="dropdown-item" to="/user_orders"> Orders </Link>

            <Link class="dropdown-item" to="/me/profile"> Profile </Link>

            <button onClick={handleLogOut} class="dropdown-item text-danger" > Logout </button>
          </div>
        </div>

       {!user ? 
         <Link to="/login" class="btn ms-4" id="login_btn"> Login </Link> :
         <button onClick={handleLogOut} id="login_btn" className="btn ms-4">Logout</button>
       }
      </div>
    </nav>
  );
};

export default Header;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../components/CommonForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/userSlice";


const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));

  };

  useEffect(()=>{
    // console.log('userROle===', user?.user?.role)
    
    if(!user?.user) return ;

    if(user?.user?.role == "user"){
       navigate('/')
    }else if(user?.user?.role == "admin"){
       navigate('/admin/dashboard')
    }
  }, [user,navigate])


  return (
    // <div>
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-6 mx-auto mt-5 p-5 shadow-lg ">
    //         <form onSubmit={handleSubmit}>
    //           <h1 className="text-center ">Login</h1>
    //           <div className="mb-3">
    //             <label for="exampleInputEmail1" className="form-label">
    //               Email
    //             </label>
    //             <input
    //               onChange={(e) => setemail(e.target.value)}
    //               type="text"
    //               className="form-control"
    //               id="exampleInputEmail1"
    //               aria-describedby="emailHelp"
    //             />
                
    //           </div>
    //           <div className="mb-3">
    //             <label for="exampleInputPassword1" className="form-label">
    //               Password
    //             </label>
    //             <input
    //               onChange={(e) => setpassword(e.target.value)}
    //               type="text"
    //               className="form-control"
    //               id="exampleInputPassword1"
    //             />
    //           </div>

    //           <div className="mb-3 flex space-5 form-check">
    //             <label for="exampleInputPassword1" className="form-label">
    //               <Link to={"/password/forgot"}>Forgot Password ?</Link>
    //             </label>
            
    //           </div>
             
    //          <span className='d-flex flex-row space-3'>
    //           <button disabled={loading} type="submit" className="btn  btn-primary ">
    //             {loading ? "Login...." : " Login"}
    //           </button>
    //           <Link to='/register'>Register</Link>
    //           </span>
    //         </form>
    //       </div>
    //     </div>
    //   </div>

     
    // </div>

    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  <div className="card shadow-lg p-4" style={{ width: "400px", height:'500px', borderRadius: "15px" }}>
    <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
    <p className="text-center text-muted mb-4">Login to your account</p>

    <form onSubmit={handleSubmit} >
      <div className="mb-3">
        <label className="form-label fw-semibold">Email</label>
        <input
          onChange={(e) => setemail(e.target.value)}
          type="email"
          className="form-control form-control-lg"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Password</label>
        <input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          className="form-control form-control-lg"
          placeholder="Enter your password"
        />
      </div>

      <div className="d-flex justify-content-between mb-3">
        <Link to="/password/forgot" className="text-decoration-none fw-semibold">
          Forgot Password?
        </Link>
      </div>

      <button
        disabled={loading}
        type="submit"
        id='login_btn'
        className="btn w-100 py-2 fw-bold"
        style={{ borderRadius: "10px" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center mt-3">
        <span className="text-muted">Don't have an account? </span>
        <Link to="/register" className="fw-semibold text-decoration-none">
          Register
        </Link>
      </div>
    </form>
  </div>
</div>

  );
};

export default Login;

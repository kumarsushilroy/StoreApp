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
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5 p-5 shadow-lg ">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center ">Login</h1>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div className="mb-3 flex space-5 form-check">
                <label for="exampleInputPassword1" className="form-label">
                  <Link to={"/password/forgot"}>Forgot Password ?</Link>
                </label>
            
              </div>
             
             <span className='d-flex flex-row space-3'>
              <button disabled={loading} type="submit" className="btn  btn-primary ">
                {loading ? "Login...." : " Login"}
              </button>
              <Link to='/register'>Register</Link>
              </span>
            </form>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Login;

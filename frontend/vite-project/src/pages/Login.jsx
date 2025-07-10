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
    console.log('userROle===', user?.user?.role)
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
              <h1 className="text-center">Login</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div class="mb-3 form-check">
                <label for="exampleInputPassword1" class="form-label">
                  <Link to={"/password/forgot"}>Forgot Password ?</Link>
                </label>
              </div>
              <button disabled={loading} type="submit" class="btn btn-primary">
                {loading ? "Login...." : " Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Login;

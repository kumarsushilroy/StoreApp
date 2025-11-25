import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../Constant";

const ResetPassword = () => {
    
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const obj = { password, confirmPassword };

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("confirm password do not match !");
      return;
    }

    try {

      const res = await axios.put(`${BASE_URL}/api/v1/password/reset/${params.token}`, obj);
      console.log(res);
      if (res) {
        alert("password reset successfully");
        navigate("/login");
      }

    } catch (error) {
      console.log("errrrrrR", error.message); 
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5 shadow-md border">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center">Reset Password</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
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
                <label for="exampleInputEmail1" class="form-label">
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

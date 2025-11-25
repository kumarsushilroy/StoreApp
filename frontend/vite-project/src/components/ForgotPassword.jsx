

import axios from 'axios';
import { useState } from 'react'
import {BASE_URL} from '../Constant.js';


const ForgotPassword = () => {

    const [email , setEmail] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await axios.post(`${BASE_URL}/api/v1/password/forgot`, {email});
        console.log(res)
        if(res){
            alert(`Email has sent to ${email}`)
        }
    }

  return (
    <div>
        <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5 shadow-md border">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center">Forgot Password</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
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
  )
}

export default ForgotPassword

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Store/userSlice';
import axios from 'axios'

const UpdatePassword = () => {

  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user)
  const id = user.user.user._id
  // console.log(user)
  // console.log(user.user.user._id)
  const [oldPassword, setOldPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const userInfo = {oldPassword, password};

  const profileDetail = async()=>{
    const userDetail = await axios.post('http://localhost:7000/api/v1/update-password',userInfo,{
      withCredentials:true,
    });
    console.log('userProfDetail==', userDetail)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    // const obj = { id,userInfo }
    // dispatch(updateUser(obj))
    
    profileDetail()
   
  }

 



  return (
     <div class="row wrapper">
      <div class="col-10 col-lg-3">
        <form onSubmit={handleSubmit} class="shadow rounded bg-body" action="#" method="post">
          <h2 class="mb-4">Update Password</h2>
          <div class="mb-3">
            <label for="old_password_field" class="form-label">
              Old Password
            </label>
            <input
             onChange={(e)=>setOldPassword(e.target.value)}
              type="text"
              id="old_password_field"
              class="form-control"
              value={oldPassword}
            />
          </div>

          <div class="mb-3">
            <label for="new_password_field" class="form-label">
              New Password
            </label>
            <input
             onChange={(e)=>setNewPassword(e.target.value)}
              type="text"
              id="new_password_field"
              class="form-control"
              value={password}
            />
          </div>

          <button type="submit" class="btn update-btn w-100">
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
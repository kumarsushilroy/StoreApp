
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleUser, updateUser } from '../../Store/userSlice';

const UpdateProfile = () => {

  const dispatch = useDispatch();

  const [username , setusername] = useState('');
  const [email , setemail] = useState('');
  

  const {user} = useSelector((state)=>state.user);
  console.log('USERRR==', user)
  const userId = user?.user._id
  console.log('Useriddd', userId)
  

  useEffect(()=>{
   dispatch(getSingleUser(userId));
   setusername(user?.user.username);
   setemail(user?.user.email);
   
  },[])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const obj = {username, email}
    const mergedval = {userId, obj}
    console.log('mergedValll', mergedval)

    const objectTopass = {id:userId,userInfo:obj}
    dispatch((updateUser(objectTopass)))

    // const obj = {username, email}
    // const updateUser = await axios.put(`http://localhost:7000/api/v1/updateUser/${userId}`, obj);
    // console.log('updateUser==', updateUser)
  }

  return (
   
         <div class="row wrapper">
      <div class="col-10 col-lg-3">
        <form
          onSubmit={handleSubmit}
          class="shadow rounded bg-body"
          action="#"
          method="post"
          enctype="multipart/form-data"
        >
          <h2 class="mb-4">Update Profile</h2>

          <div class="mb-3">
            <label for="name_field" class="form-label"> Name </label>
            <input
             onChange={(e)=>setusername(e.target.value)}
              type="text"
              id="name_field"
              class="form-control"
              name="name"
              value={username}
            />
          </div>

          <div class="mb-3">
            <label for="email_field" class="form-label"> Email </label>
            <input
             onChange={(e)=>setemail(e.target.value)}
              type="email"
              id="email_field"
              class="form-control"
              name="email"
              value={email}
            />
          </div>

          

          <button type="submit" class="btn update-btn w-100">Update</button>
        </form>
      </div>
    </div>
    
  )
}

export default UpdateProfile
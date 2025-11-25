import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Constant";

// Register
export const registerUser = createAsyncThunk('/register/user', async(formData , thunkApi)=>{
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/register`, formData,{
            withCredentials:true,
            headers:{"Content-Type": "multipart/form-data"}
        }, );
        console.log('resFromUserSlice===', res);
        const {data} = res;
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const login = createAsyncThunk('/login', async(userData , thunkApi)=>{
    try {
      // https://storeapp-fm46.onrender.com
      
        const res = await axios.post('https://storeapp-fm46.onrender.com/api/v1/login', userData ,{
            withCredentials:true
        })
        const {data} = res;
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
});

export const logOut = createAsyncThunk ('/logout', async(_ , thunkApi)=>{
    try{
       const res = await axios.post(`${BASE_URL}/api/v1/logout`, {}, {
        withCredentials:true
       })
       console.log('Logout Response ====', res);
       const {data} = res;
       return data
    }catch(error){
      return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const getSingleUser = createAsyncThunk ('/singleUser', async(id , thunkApi)=>{
  console.log('IDDD', id)
    try{
       const res = await axios.get(`${BASE_URL}/api/v1/singleUser/${id}`, {
        withCredentials:true
       })
       console.log('single Response ====', res);
       const {data} = res;
       return data
    }catch(error){
      return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const updateUser = createAsyncThunk ('/updateuser', async({id,userInfo} , thunkApi)=>{
   console.log('OBJECTyyy==',id,userInfo)
    try{
       const res = await axios.put(`${BASE_URL}/api/v1/updateUser/${id}`, userInfo, {
        withCredentials:true
       })
       console.log('updateUser Response ====', res);
       const {data} = res;
       return data
    }catch(error){
      return thunkApi.rejectWithValue(error.response.data.message)
    }
})

const userSlice = createSlice({ 
    name:'user',
    initialState:{
        loading:false,
        user:null,
        error:null
       
    },
    reducers:{},

    extraReducers:(builder)=>{
      builder.addCase(registerUser.pending, (state)=>{
        state.loading = true;
        state.user = null;
        state.error = null;
        
      }).addCase(registerUser.fulfilled, (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.error = null;
       
      }).addCase(registerUser.rejected, (state,action)=>{
        state.loading = false;
        state.user = null;
        state.error = action.payload;
       
      })

      builder.addCase(login.pending, (state)=>{
        state.loading = true;
        state.user = null;
        state.error = null;
      }).addCase(login.fulfilled , (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      }).addCase(login.rejected, (state,action)=>{
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      builder.addCase(logOut.pending, (state)=>{
        state.loading = true;
        state.user = null;
        state.error = null;
      }).addCase(logOut.fulfilled, (state,action)=>{
        state.loading = false;
        // state.user = action.payload;
        state.user = null;
        state.error = null;
      }).addCase(logOut.rejected, (state,action)=>{
        state.loading = false,
        state.user = null;
        state.error = action.payload;
         
      })

      builder.addCase(getSingleUser.pending, (state)=>{
        state.loading = true;
        state.user = null;
        state.error = null;
      }).addCase(getSingleUser.fulfilled, (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        // state.user = null;
        state.error = null;
      }).addCase(getSingleUser.rejected, (state,action)=>{
        state.loading = false,
        state.user = null;
        state.error = action.payload;
         
      }),


       builder.addCase(updateUser.pending, (state)=>{
        state.loading = true;
        state.user = null;
        state.error = null;
      }).addCase(updateUser.fulfilled, (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        // state.user = null;
        state.error = null;
      }).addCase(updateUser.rejected, (state,action)=>{
        state.loading = false,
        state.user = null;
        state.error = action.payload;
         
      })
    }
})

export default userSlice.reducer;
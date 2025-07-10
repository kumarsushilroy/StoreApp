import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Register
export const registerUser = createAsyncThunk('/register/user', async(formData , thunkApi)=>{
    try {
        const res = await axios.post('http://localhost:7000/api/v1/register', formData,{
            withCredentials:true
        } );
        console.log('resFromUserSlice===', res);
        const {data} = res;
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

export const login = createAsyncThunk('/login', async(userData , thunkApi)=>{
    try {
        const res = await axios.post('http://localhost:7000/api/v1/login', userData ,{
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
       const res = await axios.post('http://localhost:7000/api/v1/logout', {}, {
        withCredentials:true
       })
       console.log('Logout Response ====', res);
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
    }
})

export default userSlice.reducer;
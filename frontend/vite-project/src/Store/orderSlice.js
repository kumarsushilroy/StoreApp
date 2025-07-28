import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allOrders = createAsyncThunk('/fetch/allOrders', async(_ , thunkApi)=>{
  
    try {
        const res = await axios.get('http://localhost:7000/api/v1/get/allOrders');
        const {data} = res;
    
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message);
    }
})

export const makeOrder = createAsyncThunk('/create/order', async(orderData , thunkApi)=>{
  try {
     const res = await axios.post('http://localhost:7000/api/v1/create/order', orderData,{
      withCredentials:true
     });
     const {data} = res;
     console.log('orderData== ', data);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message)
  }
})

export const getuserOrders = createAsyncThunk('/get/userOrders',async(_ , thunkApi)=>{
  try {
    const res = await axios.get(`http://localhost:7000/api/v1/get/userOrders`,{
      withCredentials:true
    });
    const {data} = res;
    console.log('DAATA= ', data)
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message)
  }
})

const orderSlice = createSlice({
    name:'orders',
    initialState:{
        loading:false,
        orders:[],
        userOrders:[],
        error:null
    },
    reducers:{},

    extraReducers:(builder)=>{
      builder.addCase(allOrders.pending, (state)=>{
        state.loading = true,
        state.orders = null,
        state.error = null
      }).addCase(allOrders.fulfilled, (state, action)=>{
        state.loading = false,
        state.orders = action.payload
        state.error = null
      }).addCase(allOrders.rejected, (state,action)=>{
        state.loading = false,
        state.orders = null,
        state.error = action.payload
      })

      // create Order
      builder.addCase(makeOrder.pending, (state)=>{
        state.loading = true;
        state.orders = null;
        state.error = null;
      }).addCase(makeOrder.fulfilled, (state,action)=>{
        state.pending = false;
        state.orders = action.payload;
        state.error = null;
      }).addCase(makeOrder.rejected, (state,action)=>{
        state.pending = false;
        state.orders = null;
        state.error = action.payload
      })

      // get user Orders
      builder.addCase(getuserOrders.pending, (state)=>{
        state.loading = true;
        state.userOrders = null;
        state.error = null;
      }).addCase(getuserOrders.fulfilled, (state,action)=>{
        state.loading = false;
        state.userOrders = action.payload;
        state.error = null
      }).addCase(getuserOrders.rejected, (state,action)=>{
        state.loading = false;
        state.userOrders = null;
        state.error = action.payload;
      })
    }

});


export default orderSlice.reducer;
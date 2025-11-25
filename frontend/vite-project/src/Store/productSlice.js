
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Constant";

export const fetchProducts = createAsyncThunk('get/products', async(params , thunkApi)=>{
   console.log('paramssss', params)
   try {
      

    const res = await axios.get(`${BASE_URL}/api/v1/get/products`,{
      params:{
         page:params?.page,
         search: params?.keyword ,
         company: params?.companyVal 
         
      }
    });
    const {data} = res;
    return data
   } catch (error) {
     return thunkApi.rejectWithValue(error.response.data.message)
   }
    
})

// single product details
 export const productDetail = createAsyncThunk('/get/productDetails', async(productId , thunkApi)=>{
   try {
      const res = await axios.get(`${BASE_URL}/api/v1/productDetails/${productId}`);
      const {data} = res 
      return data;
   } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message)
   }
 })

const productSlice = createSlice({

    name:'products',
    initialState:{
        products:[],
        isLoading:false,
        error:null
    },
    reducers:{},

    extraReducers:(builder)=>{

      // fetch productss
       builder.addCase(fetchProducts.pending, (state)=>{
        state.isLoading = true
        state.error = null
       })
       .addCase(fetchProducts.fulfilled, (state, action)=>{
          state.isLoading = false,
          state.products = action.payload
       })
       .addCase(fetchProducts.rejected, (state,action)=>{
        state.error = action.payload 
        state.isLoading = false
       });


       // single product details
       builder.addCase(productDetail.pending, (state)=>{
         state.isLoading = true;
         state.products = null;
         state.error = null
       }).addCase(productDetail.fulfilled, (state,action)=>{
         state.isLoading = false;
         state.products = action.payload;
         state.error = null
       }).addCase(productDetail.rejected, (state, action)=>{
         state.isLoading = false;
         state.products = null;
         state.error = action.payload
       })
    }

    
})

export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItem: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

      shippingInfo: localStorage.getItem('shippingData') ? JSON.parse(localStorage.getItem('shippingData')) : {}
  },

  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItem.find(
        (i) => i.product == item.product
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItem.push(item);
        //   state.cartItem =  [...state.cartItem,item]
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      console.log(...state.cartItem);
    },

    removeItem: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.product !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },

    clearCart:(state)=>{
      state.cartItem = null;
      localStorage.clear('cartItems');
    },

    addShipping:(state,action)=>{
      state.shippingInfo = action.payload ;

      localStorage.setItem('shippingData', JSON.stringify(state.shippingInfo));
    }
  },
});

export const { addItemToCart, removeItem, addShipping, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

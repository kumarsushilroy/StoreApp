import React, { useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../components/common";
import { useDispatch } from "react-redux";
import { makeOrder } from "../../Store/orderSlice";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import { clearCart } from "../../Store/cartSlice";

const PaymentMethod = () => {

  const [method, setMethod] = useState("");
  const { cartItem, shippingInfo } = useSelector((state) => state.cartSlice);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cartItem);
  const {orders} = useSelector((state)=>state.order);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      shippingInfo: shippingInfo,
      orderItems: cartItem,
      paymentMethod: method,
      paymentInfo: {
        status: "Not Paid",
        id:'payment Id'
      },
      itemsPrice: itemsPrice,
      taxAmount: taxPrice,
      shippingAmount: shippingPrice,
      totalAmount: totalPrice,
    };

    dispatch(makeOrder(orderData));
    if(orders){
      dispatch(clearCart());
      toast('Order Placed Successfully !')
       navigate('/')
    }
   
   
  };

  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />
      <div>
        <div class="row wrapper">
          <div class="col-10 col-lg-5">
            <ToastContainer/>
            <form
              onSubmit={handleSubmit}
              class="shadow rounded bg-body"
              action="your_submit_url_here"
              method="post"
            >
              <h2 class="mb-4">Select Payment Method</h2>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="payment_mode"
                  id="codradio"
                  value="COD"
                  onChange={(e) => setMethod(e.target.value)}
                />
                <label class="form-check-label" for="codradio">
                  Cash on Delivery
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="payment_mode"
                  id="cardradio"
                  value="Card"
                  onChange={(e) => setMethod(e.target.value)}
                />
                <label class="form-check-label" for="cardradio">
                  Card - VISA, MasterCard
                </label>
              </div>

              <button id="shipping_btn" type="submit" class="btn py-2 w-100">
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;

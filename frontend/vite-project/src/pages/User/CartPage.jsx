import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { addItemToCart, removeItem } from "../../Store/cartSlice";
import { useNavigate } from "react-router-dom";


const CartPage = () => {

  const { cartItem } = useSelector((state) => state.cartSlice);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

     const increaseQty = (item, quantity)=>{
      const newQty = quantity + 1
        if(newQty>stock) return;
       addToCart(item, newQty)

      }

 

  const decreaseQty = (item, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 1) return;
    addToCart(item, newQty);
  };

  const removeCart = (id)=>{
    dispatch(removeItem(id))
  }

  const addToCart = (item, newQty) => {
    const cartItems = {
      name: item?.name,
      company: item?.company,
      price: item?.price,
      image: item?.photo,
      stock: item?.stock,
      product: item?.product,
      quantity: newQty,
    };

    dispatch(addItemToCart(cartItems));
  };

  return (
    <div>
      {
        cartItem.length ? (
          <>
             <h2 className="mt-5">
        Your Cart: <b>{cartItem.length} items</b>
      </h2>

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 p-4">

          {cartItem?.map((item, key) => (
            <div key={key} className="cart-item" data-key="product1">
              <div className="row">
                <hr />
                <div className="col-4 col-lg-3">
                  <img src={item?.image} alt="Laptop" height="90" width="115" />
                </div>
                <div className="col-5 col-lg-3">
                  <Link to={`/productDetail/${item?.product}`}>
                    {" "}
                    {item?.name}{" "}
                  </Link>
                </div>
                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p id="card_item_price">${item?.price}</p>
                </div>
                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <div className="stockCounter d-inline">
                    <span
                      onClick={() => decreaseQty(item, item.quantity)}
                      className="btn btn-danger minus"
                    >
                      {" "}
                      -{" "}
                    </span>
                    <input
                      type="number"
                      className="form-control count d-inline"
                      value={item?.quantity}
                      readonly
                    />
                    <span
                      onClick={() => increaseQty(item, item.quantity)}
                      className="btn btn-primary plus"
                    >
                      {" "}
                      +{" "}
                    </span>
                  </div>
                </div>
                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                  <span  onClick={()=>removeCart(item?.product)} className="text-danger">
                    <FaTrash />
                  </span>
                </div>
              </div>
            </div>
          ))}

          <hr />
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">
               {cartItem.reduce((acc,item)=>acc + item?.quantity,0)}   (Units)</span>
            </p>
            <p>
              Est. total: <span className="order-summary-values">
                {cartItem.reduce((acc,item)=> acc + item?.quantity * item?.price,0)}
              </span>
            </p>
            <hr />
            <button onClick={()=>navigate('/shipping')} id="checkout_btn" className="btn btn-primary w-100">
              Check out
            </button>
          </div>
        </div>
      </div>
          </>
        ):(
          <h1 className="text-center">Your cart is empty !</h1>
        )
      }
     
    </div>
  );
};

export default CartPage;

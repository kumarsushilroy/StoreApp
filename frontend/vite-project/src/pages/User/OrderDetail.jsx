import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { singleOrderDetail } from "../../Store/orderSlice";
import moment from "moment";


const OrderDetail = () => {

  const params = useParams();
  const id = params.id;
  
  const dispatch = useDispatch();


  const {orderDetail} = useSelector((state)=>state.order);
  
  console.log('ORDer Detaillll==', orderDetail)

  
  useEffect(() => {
    
    if(id){
       dispatch(singleOrderDetail(id)) 
    }
    
  }, [id]);

 

  

  return (
    <div>
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-lg-9 mt-5 order-details">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="mt-5 mb-4">Your Order Details</h3>
            <a class="btn btn-success" href="/invoice/order/order-id">
              <i class="fa fa-print"></i> Invoice
            </a>
          </div>
          <table class="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>Order ID</td>
              </tr>
              <tr>
                <th scope="row">Status</th>
                <td class="greenColor"><b>{orderDetail?.orderDetail.orderStatus}</b></td>
              </tr>
              <tr>
                <th scope="row">Date</th>
                <td>{moment(orderDetail?.orderDetail?.createdAt).format('YYYY-MM-DD ,   h:mm')}</td>
              </tr>
            </tbody>
          </table>

          <h3 class="mt-5 mb-4">Shipping Info</h3>
          <table class="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{orderDetail?.orderDetail?.user?.username}</td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>+1 123-456-7890</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                {/* <td>123 Main Street, City, Postal Code, Country</td> */}
                <td>{orderDetail?.orderDetail?.shippingInfo?.address}, {orderDetail?.orderDetail?.shippingInfo?.city}, {orderDetail?.orderDetail?.shippingInfo?.zipCode}, {orderDetail?.orderDetail?.shippingInfo?.country}</td>
              </tr>
            </tbody>
          </table>

          <h3 class="mt-5 mb-4">Payment Info</h3>
          <table class="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td class={orderDetail?.orderDetail?.paymentInfo?.status=='Paid'?'greenColor':'redColor'}>
                  <b>{orderDetail?.orderDetail?.paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{orderDetail?.orderDetail?.paymentMethod}</td>
              </tr>
              {/* <tr> 
                <th scope="row">Stripe ID</th>
                <td>stripe-id</td>
              </tr> */}
              <tr>
                <th scope="row">Amount Paid</th>
                <td>{orderDetail?.orderDetail?.totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 class="mt-5 my-4">Order Items:</h3>

          <hr />

          {
            orderDetail?.orderDetail?.orderItems?.map((item)=>(
              <div class="cart-item my-1">
            <div class="row my-5">
              <div class="col-4 col-lg-2">
                <img
                  src={item?.image}
                  alt=''
                  height="45"
                  width="65"
                />
              </div>

              <div class="col-5 col-lg-5">
                <a href="/products/product-id">{item?.name}</a>
              </div>

              <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                <p>${item?.price}</p>
              </div>

              <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                <p>{item?.quantity} Piece(s)</p>
              </div>
            </div>
          </div>
            ))
          }
         

         
          <hr />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

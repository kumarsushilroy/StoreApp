
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productDetail } from "../Store/productSlice";
import { useEffect } from "react";
import { useState } from "react";
import Shimer from "../components/Shimer";
import { addItemToCart } from "../Store/cartSlice";
import {toast, ToastContainer} from 'react-toastify';

const ProductDetail = ()=>{
  
  

  const params = useParams();
  const {id} = params;

   const {isloading, error, products} = useSelector((state)=>state?.product);
   const {user} = useSelector((state)=>state.user);

   const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(productDetail(id))
  },[])
 
  console.log('singleProductttt=', products)

  const [quantity , setQuantity] = useState(1);

  const increaseQty = ()=>{
    if(quantity>=products?.singleProd?.stock){
      return
    }
    setQuantity(quantity+1)
    

  }

  const decreaseQty = ()=>{
     if(quantity<=1){
      return
     }
     setQuantity(quantity-1)
  }

 

  

  const addToCart = ()=>{
    if(!user){
      toast.error('Please login !')
      return
    }
    const cartItems = {
    name:products?.singleProd?.name,
     company:products?.singleProd?.company,
     price:products?.singleProd?.price,
     image:products?.singleProd?.photo,
     stock:products?.singleProd?.stock,
     product:products?.singleProd?._id,
     quantity
    }

    dispatch(addItemToCart(cartItems));
    toast.success(`item added to cart !`)
  }


  return(
    <>
    {
      isloading? <Shimer/>:

       <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={products?.singleProd?.photo}
            alt=""
            width="340"
            height="390"
          />

          
        </div>
        
        <div className="row justify-content-start mt-5">
          <div className="col-2 ms-4 mt-2">
            <a role="button">
              <img
                className="d-block border rounded p-3 cursor-pointer"
                height="100"
                width="100"
                src={products?.singleProd?.photo}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{products?.singleProd?.company}</h3>
        <p id="product_id">Product: {products?.singleProd?._id}</p>

        <hr />

   <ToastContainer/>

        <div className="d-flex">
          <div className="star-ratings">
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
            <i className="fa fa-star star-active"></i>
          </div>
          <span id="no-of-reviews" className="pt-1 ps-2"> (1 Reviews) </span>
        </div>
        <hr />

        <p id="product_price">${products?.singleProd?.price}</p>
        <div className="stockCounter d-inline">
          <span onClick={decreaseQty} className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readonly
          />
          <span onClick={increaseQty} className="btn btn-primary plus">+</span>
        </div>
        <button
         onClick={addToCart}
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled=""
        >
          Add to Cart
        </button>

        <hr />

        <p>
          {/* Status: <span id="stock_status" className="greenColor">In Stock</span> */}
          {`Stock Quantity: ${products?.singleProd?.stock}`}
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        {
          products?.singleProd?.description ? (<p>{products?.singleProd?.description}</p>) : (
             <h3>
         Loading.....
        </h3>
          )
        }
        
       
        <hr />
        <p id="product_seller mb-3">Sold by: <strong>Tech</strong></p>

        {
          !user && (
            <div className="alert alert-danger my-5" type="alert">
              Login to post your review.
            </div>
          )
        }
      </div>
    </div>
    }
    

    </>
  )
}

export default ProductDetail;
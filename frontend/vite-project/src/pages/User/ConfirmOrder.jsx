import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateOrderCost } from "../../components/common";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {

  const { cartItem, shippingInfo } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.user.user);
  console.log("USER", cartItem);

  const {itemsPrice, shippingPrice, taxPrice, totalPrice} = calculateOrderCost(cartItem)



  return (
    <>
    <CheckoutSteps shipping confirmOrder />
    <div>
      <div className="row p-5 d-flex justify-content-between">
        <div className="col-12  col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.username}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phone}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.zipCode}, {shippingInfo?.country}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItem?.map((item) => (
            <>
              <hr />
              <div key={item?.product} className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item?.image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/productDetail/${item?.product}`}>{item?.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {`${item?.quantity} X ${item?.price}  `} = <b>{item.quantity*item?.price}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping: <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ConfirmOrder;

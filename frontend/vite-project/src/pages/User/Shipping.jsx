import { countries } from "countries-list";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShipping } from "../../Store/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const countryList = Object.values(countries);
  console.log(countryList);

  const dispatch = useDispatch();
  
  const {shippingInfo} = useSelector((state)=>state.cartSlice);

  const navigate = useNavigate();

  useEffect(()=>{

    setAddress(shippingInfo?.address);
    setCity(shippingInfo?.city);
    setPhoneNo(shippingInfo?.phoneNo);
    setZipCode(shippingInfo?.zipCode);
    setCountry(shippingInfo?.country);

  },[shippingInfo])

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(addShipping({address, city, phoneNo, zipCode, country}));
    navigate('/confirm_order');
  }

  return (
    <>
    <CheckoutSteps shipping />

    <div>
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit}
            className="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
          >
            <h2 className="mb-4">Shipping Info</h2>
            <div className="mb-3">
              <label for="address_field" className="form-label">
                Address
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                required
              />
            </div>

            <div className="mb-3">
              <label for="city_field" className="form-label">
                City
              </label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                required
              />
            </div>

            <div className="mb-3">
              <label for="phone_field" className="form-label">
                Phone No
              </label>
              <input
                onChange={(e) => setPhoneNo(e.target.value)}
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                required
              />
            </div>

            <div className="mb-3">
              <label for="postal_code_field" className="form-label">
                Postal Code
              </label>
              <input
                onChange={(e) => setZipCode(e.target.value)}
                type="number"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={zipCode}
                required
              />
            </div>

            <div className="mb-3">
              <label for="country_field" className="form-label">
                Country
              </label>
              <select
                onChange={(e) => setCountry(e.target.value)}
                id="country_field"
                className="form-select"
                name="country"
                required
              >
                {countryList?.map((item) => (
                  <option value={item?.name}>{item?.name}</option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Shipping;

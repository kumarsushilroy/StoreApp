import { useEffect, useState } from "react";
import Adminlayout from "../../components/Adminlayout";
import Items from "./Items";
import { FaRandom } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { allUsers } from "../../Store/userSlice";
import { fetchProducts } from "../../Store/productSlice";
import { allOrders } from "../../Store/orderSlice";

const AdminDashboard = () => {

  const dispatch = useDispatch();

  const {user} = useSelector((state)=>state.user);
  const {products} = useSelector((state)=>state.product);
  const {orders} = useSelector((state)=>state.order)
  useEffect(()=>{
    dispatch(allUsers())
    dispatch(fetchProducts())
    dispatch(allOrders())
  },[])

 console.log('USSERRR=', user?.users?.length);
 console.log('produtsss==', products);
 console.log('ordersss', orders);
  return (
    <>
     <div className="container">
      <div className="row gap-3  d-flex justify-content-around">
        <div className="col-md-3 card bg-warning shadow">
          <h3 className="p-2 text-center fw-bold">{user?.users?.length} users</h3>
        </div>
        <div className="col-md-3 bg-success card shadow">
          <h3 className="p-2 text-center fw-bold">{products?.products?.length} products</h3>
        </div>
        
         <div className="col-md-3  bg-danger card shadow">
          <h3 className="p-2 text-center fw-bold">{orders?.orders?.length} orders</h3>
        </div>
      </div>
     </div>
    </>
  );
};

export default AdminDashboard;

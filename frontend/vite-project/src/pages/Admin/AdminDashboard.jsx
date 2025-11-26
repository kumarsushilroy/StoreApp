import { useEffect, useState } from "react";
import Adminlayout from "../../components/Adminlayout";
import Items from "./Items";
import { FaRandom } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { allUsers } from "../../Store/userSlice";
import { fetchProducts } from "../../Store/productSlice";

const AdminDashboard = () => {

  const dispatch = useDispatch();

  const {user} = useSelector((state)=>state.user);
  const {products} = useSelector((state)=>state.products);

  useEffect(()=>{
    dispatch(allUsers())
    dispatch(fetchProducts())
  },[])

 console.log('USSERRR=', user);
 console.log('produtsss==', products);
  return (
    <>
     <div className="container">
      <div className="row gap-1">
        <div className="col-md-3 card bg-warning shadow">
          <h3>{user?.users.length}Users</h3>
        </div>
        <div className="col-md-3 bg-success card shadow">
          <h3>{products?.products.length}Products</h3>
        </div>
        <div className="col-md-3 bg-secondary card shadow">
          Stocks
        </div>
        <div className="col-md-3 bg-danger card shadow">
          Stocks
        </div>
      </div>
     </div>
    </>
  );
};

export default AdminDashboard;

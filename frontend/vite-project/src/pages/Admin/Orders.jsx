
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { allOrders } from "../../Store/orderSlice";
import { useState } from "react";
import axios from "axios";

const Orders = () => {

    const dispatch = useDispatch();
const {loading, orders, error} = useSelector((state)=>state.order);

const [statusVal , setStatusVal] = useState('')


    useEffect(()=>{
       dispatch(allOrders());
    },[statusVal])

  console.log('ORDER== ', orders?.orders)

  const handleOrderStatus = async (e,orderId)=>{
     
      const status = e.target.value;
      setStatusVal(status)
    const res = await axios.put(`http://localhost:7000/api/v1/update/order/${orderId}`,{status}, {
        withCredentials:true
    });
    console.log('REsponseeeee', res);
  }

 

  return (
    <div>
        
        <table class="table">
  <thead>
    <tr>
        <th scope="col">S.no</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">photo</th>
      <th scope="col">User</th>
      <th className="text-center" scope="col">orderStatus</th>
      <th className="text-center" scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   
      {
        orders?.orders?.map((item,i)=>(
            <tr>
         <th>{i+1}</th>
         <td>{item?.orderItems[0]?.name}</td>
         <td>{item?.orderItems[0]?.price}</td>
         <td><img style={{width:'200px'}} src={item?.orderItems[0]?.image} alt="" /></td>
         <td>{item?.user?.username}</td>
         <td className="text-center"><p className="bg-warning">{item?.orderStatus}</p></td>
         <td className="text-center">
            <select onChange={(e)=>handleOrderStatus(e,item?._id)} className="form-control" name="" id="">
                <option value="">change status</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
            </select>
        </td>
         </tr>
        ))
      }
    
  </tbody>
</table>
    </div>
  )
}

export default Orders

import { useSelector,useDispatch } from "react-redux"
import { getuserOrders } from "../../Store/orderSlice";
import { useEffect } from "react";
import {MDBDataTable} from 'mdbreact'
import {FaEye} from 'react-icons/fa';
import {Link} from 'react-router-dom'

const MyOrders = () => {

 const dispatch = useDispatch();
 const {userOrders} = useSelector((state)=>state.order);
 console.log('userOrdersss', userOrders?.orders);

 useEffect(()=>{
   dispatch(getuserOrders());
 },[])

 const setOrders = ()=>{
    const orders = {
      columns:[
        {
          label:"ID",
          field:"id",
          sort:"asc"
        },

        {
          label:"Amount Paid",
          field:"amount",
          sort:"asc"
        },

        {
          label:"Payment Status",
          field:"status",
          sort:"asc"
        },

        {
          label:"Order Status",
          field:"orderStatus",
          sort:"asc"
        },

         {
          label:"Actions",
          field:"Actions",
          sort:"asc"
        }
      ],
      rows:[] 

      
    }

    userOrders?.orders?.forEach((item)=>{
     orders.rows.push({
        id:item?._id,
        amount:item?.totalAmount,
        status:item?.paymentInfo?.status.toUpperCase(),
        orderStatus:item?.orderStatus,
        Actions:(
          <>
          <Link to={`/orderDetail/${item?._id}`}>
           <FaEye/>
          </Link>
          </>
        )
      })
    })

    return orders
 }

  return (
    <div>
         <div className="container">
      <div className="row">
        <div className="col-md-12 mx-auto">
          {!userOrders ? (
            <h2 className="text-center mt-5">No orders yet !</h2>
          ) : (
           
            <MDBDataTable
             data={setOrders()}
             bordered
             striped
            />
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default MyOrders
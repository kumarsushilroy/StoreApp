
import { useSelector,useDispatch } from "react-redux"
import { getuserOrders } from "../../Store/orderSlice";
import { useEffect } from "react";


const MyOrders = () => {

 const dispatch = useDispatch();
 const {userOrders} = useSelector((state)=>state.order);
 console.log('userOrdersss', userOrders?.orders);

 useEffect(()=>{
   dispatch(getuserOrders());
 },[])

  return (
    <div>
         <div className="container">
      <div className="row">
        <div className="col-md-12 mx-auto">
          {!userOrders ? (
            <h2 className="text-center mt-5">No orders yet !</h2>
          ) : (
            <table className="table table-striped w-full mt-4">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Status</th>
              </tr>

              {userOrders?.orders?.map((item, i) => {
                return (
                  <tr>
                    <td>{item?.orderItems[0]?.name}</td>
                    <td>{item?.orderItems[0]?.price}</td>
                    
                    <td>
                      <img
                        style={{ width: "170px", height: "70px" }}
                        src={item?.orderItems[0].image}
                        alt=""
                      />
                    </td>
                    <td className="d-flex gap-2">
                      <button className="btn bg-warning">{item?.orderStatus}</button>
                      
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default MyOrders
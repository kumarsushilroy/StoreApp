import { useNavigate } from "react-router-dom";
const ProductCard = ({item})=>{

   const navigate = useNavigate();

    return (
        <div className="border p-4 rounded">
          <p>Category: {item?.category?.categoryName}</p>
          <h5>Created by: {item?.userInfo?.username}</h5>
            <img className="w-50" src={item.photo} alt="" />
         <h5>Name:{item.name}</h5>
         <p>Company:{item.company}</p>
         <h6>Price:{item.price}</h6>
         <button onClick={()=>navigate(`/productDetail/${item?._id}`)} className="btn btn-success p-2 ">Cart</button>
        </div>
    )
}


export default ProductCard;
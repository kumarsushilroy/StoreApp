import { useNavigate } from "react-router-dom";
const ProductCard = ({item})=>{

   const navigate = useNavigate();

    return (
        // <div className="border p-4 rounded">
        //   <p>Category: {item?.category?.categoryName}</p>
        //   <h5>Created by: {item?.userInfo?.username}</h5>
        //     <img className="w-50" src={item.photo} alt="" />
        //  <h5>Name:{item.name}</h5>
        //  <p>Company:{item.company}</p>
        //  <h6>Price:{item.price}</h6>
        //  <button onClick={()=>{ { navigate(`/productDetail/${item?._id}`)}}} className="btn btn-success p-2 ">Cart</button>
        // </div>


         <div class="col-sm-12 col-md-6 col-lg-3 my-3">
                  <div class="card p-3 rounded">
                    <img
                      class="card-img-top mx-auto"
                      src={item?.photo}
                      alt=""
                    />
                    <div class="card-body ps-3 d-flex justify-content-center flex-column">
                      <h5 class="card-title">
                        <a href="">{item?.name}</a>
                      </h5>
                      <div class="ratings mt-auto d-flex">
                        <div class="star-ratings">
                          <i class="fa fa-star star-active"></i>
                          <i class="fa fa-star star-active"></i>
                          <i class="fa fa-star star-active"></i>
                          <i class="fa fa-star star-active"></i>
                          <i class="fa fa-star star-active"></i>
                        </div>
                        <span id="no_of_reviews" class="pt-2 ps-2">
                          Stock
                          {item?.stock}
                        </span>
                      </div>
                      <p class="card-text mt-2">${item?.price}</p>
                      <button onClick={()=>{ { navigate(`/productDetail/${item?._id}`)}}} class="btn fw-bold btn-block bg-warning">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

        
    )
}


export default ProductCard;
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Adminlayout from "../../components/Adminlayout";
import { BASE_URL } from "../../Constant";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import CommonModal from "../../components/CommonModal";
import { deleteProduct } from "../../Store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { productDetail } from "../../Store/productSlice";
import { updateProduct } from "../../Store/productSlice"; 

const AdminProdct = () => {
 
  const [adminContent, setAdminContent] = useState([]);

  const [productId, setProductId] = useState(null);
  const [name, setName] = useState(null);
  const [company, setCompany] = useState(null);
  const [price , setPrice] = useState(null);
  const [photo , setPhoto] = useState(null);

  const dispatch = useDispatch();
  
  const { products } = useSelector((state) => state.product);

  useEffect(()=>{
      dispatch(productDetail(productId));
  },[productId])

  useEffect(()=>{
    if(products?.singleProd){
    setName(products?.singleProd?.name);
    setCompany(products?.singleProd?.company);
    setPrice(products?.singleProd?.price);
    setPhoto(products?.singleProd?.photo);
    }
  },[products?.singleProd])

  const editedProduct = products?.editedProduct;

  useEffect(()=>{
    if(editedProduct){
    toast.success(products.message)
   }
  },[editedProduct])
  
  
  console.log('PRODUCT=', products)
  const adminInfo = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/my-profile`, {
      withCredentials: true,
    });

    const products = res?.data?.myself?.[0]?.product;
    setAdminContent(products);
  };

  useEffect(() => {
    adminInfo();
  }, []);

  const handleDelete = async () => {
    try {
      dispatch(deleteProduct(productId));
      toast.success("product deleted");
      console.log("deleted resp=", products);
      setTimeout(() => {
        adminInfo();
      }, 1000);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleProductUpdate = (e) => {
    e.preventDefault();
    const updatedObj = {name,company,price,photo}
   dispatch(updateProduct({productId,updatedObj}));
   
  };
 console.log('updateProduct==', products)
  console.log("dsdff", adminContent);

  return (
    // <Adminlayout>
    <div className="container">
      <div className="row">
        <div className="col-md-12 mx-auto">
          {adminContent.length == 0 ? (
            <h2 className="text-center mt-5">Product not added yet !</h2>
          ) : (
            <table className="table table-striped w-full mt-4">
              <tr>
                <th>Name</th>
                <th>company</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>

              {adminContent?.map((item, i) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.price}</td>
                    <td>
                      <div className=" w-40 p-2 ">
                        <img
                          className="rounded shadow"
                          style={{ width: "170px", height: "70px" }}
                          src={item.photo}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="d-flex gap-2">
                      {/* <button onClick={()=>setShowModal(true)} className="btn bg-success fw-bold px-4 text-white"><FaEdit />
                      </button> */}
                      <button
                        onClick={()=>setProductId(item._id)}
                        className="btn bg-success fw-bold px-4 text-white"
                        data-bs-toggle="modal"
                        data-bs-target="#updateProductModal"
                      >
                        <FaEdit />
                      </button>

                      {/* <button onClick={()=>handleDelete(item._id)} className="btn bg-danger fw-bold text-white px-4">
                        <RiDeleteBin2Fill />
                      </button> */}

                       <button onClick={()=>setProductId(item._id)}
                       className="btn bg-danger fw-bold text-white px-4"
                       data-bs-toggle="modal"
                       data-bs-target="#deleteProduct"
                       >
                        <RiDeleteBin2Fill />
                      </button>
                    </td>
                  </tr>
                );
              })}

              <ToastContainer position="top-center" />
            </table>
          )}
        </div>
        <CommonModal
         modalId="updateProductModal"
          modalTitle={"Update Product"}
          btnText={"Save Changes"}
          onSubmit={handleProductUpdate}
        >
          <form>
           
            <div class="form-group">
              <label for="exampleInputEmail1">Product Name</label>
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
             
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Company</label>
              <input
                value={company}
                onChange={(e)=>setCompany(e.target.value)}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Price</label>
              <input
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

             <div class="form-group">
              <label for="exampleInputPassword1">Photo</label>
              <input
                onChange={(e)=>setPhoto(e.target.files[0])}
                type='file'
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
           
           
          </form>
        </CommonModal>

        <CommonModal 
          modalId={"deleteProduct"}
          modalTitle='Delete Product'
          btnText={'Delete'}
          onSubmit={handleDelete}
        >
        <h4>Are you sure ?</h4>
        </CommonModal>
      </div>
    </div>
    // </Adminlayout>
  );
};

export default AdminProdct;

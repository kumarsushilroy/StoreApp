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

const AdminProdct = () => {
  const [showModal, setShowModal] = useState(false);

  const [adminContent, setAdminContent] = useState([]);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

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

  const handleDelete = async (prodId) => {
    try {
      dispatch(deleteProduct(prodId));
      toast.success("product deleted");
      console.log("deleted resp=", products);
      setTimeout(() => {
        adminInfo();
      }, 1000);
    } catch (error) {
      toast.error(error);
    }
  };

  const updateProduct = () => {
    alert("product updated");
  };

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
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#updateProductModal"
                      >
                        Edit
                      </button>

                      <button className="btn bg-danger fw-bold text-white px-4">
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
        {/* <CommonModal
         modalId="updateProductModal"
          modalTitle={"Update Product"}
          btnText={"Save Changes"}
          functionality={updateProduct}
        >
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </CommonModal> */}
      </div>
    </div>
    // </Adminlayout>
  );
};

export default AdminProdct;

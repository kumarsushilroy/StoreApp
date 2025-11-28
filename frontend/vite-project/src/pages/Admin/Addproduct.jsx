import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Adminlayout from "../../components/Adminlayout";
import { BASE_URL } from "../../Constant";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [company, setcompany] = useState("");
  const [price, setprice] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [description, setDescription] = useState("");

  const [category, setcategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/get/category`);
      setLoading(false);
      setcategory(res?.data?.allCategory);
    };
    fetchCategories();
  }, []);
  console.log("RES==", category);

  // addProduct
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("company", company);
    formData.append("price", price);
    formData.append("photo", photo);
    formData.append("categoryId", categoryId);
    formData.append("stock", stock);
    formData.append("description", description);
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/create/product`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("product add resp", res);
      if (res.status == 200) {
        toast.success(res?.data?.message);
        setTimeout(() => {
          navigate("/admin/products");
        }, 1000);
      }
      setLoading(false);
    } catch (error) {
      console.log("ERROR==", error);
      alert(error?.response?.data?.message);
    }
  };
  return (
    <div>
      {/* <Adminlayout> */}
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto shadow-md border">
            <form onSubmit={handleSubmit} className="p-3 m-2">
              <h3 className="text-center m-2">+ Product</h3>

              <div className="row">
                <div className="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Name
                    </label>
                    <input
                      onChange={(e) => setname(e.target.value)}
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Company
                    </label>
                    <input
                      onChange={(e) => setcompany(e.target.value)}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Price
                    </label>
                    <input
                      onChange={(e) => setprice(e.target.value)}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Stock
                    </label>
                    <input
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                      type="number"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Category
                    </label>
                    <select
                      className="form-control"
                      name=""
                      id=""
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                      }}
                    >
                      <option value="">select category</option>
                      {category?.map((item, i) => {
                        return (
                          <option key={i} value={item._id}>
                            {item.categoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="exampleInputPassword1" class="form-label">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    value={description}
                    name=""
                    id=""
                  ></textarea>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Upload Photo
                </label>
                <span>
                  {photoPreview ? (
                    <img
                      style={{ width: "100px", padding: "10px" }}
                      src={photoPreview}
                      alt="image preview"
                    />
                  ) : (
                    ""
                  )}
                  <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  ></input>
                </span>
              </div>

              <ToastContainer position="top-center" />
              <button
                disabled={loading}
                id="login_btn"
                type="submit"
                class="btn "
              >
                {loading ? "adding...." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* </Adminlayout> */}
    </div>
  );
};

export default AddProduct;

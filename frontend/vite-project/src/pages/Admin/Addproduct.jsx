import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Adminlayout from "../../components/Adminlayout";

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [company, setcompany] = useState("");
  const [price, setprice] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const [category, setcategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [stock , setStock] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:7000/api/v1/get/category");
      setLoading(false);
      setcategory(res?.data?.allCategory);
      console.log("RES==", category);
    };
    fetchCategories();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader?.result);
      setPhoto(file);
    };
    //   console.log('REader', photoPreview)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const obj = {name, company, price, photo, category};
  //  console.log('OBJECT==', obj)

    const formData = new FormData();
    formData.append("name", name);
    formData.append("company", company);
    formData.append("price", price);
    formData.append("photo", photo);
    formData.append("categoryId", categoryId);
    formData.append('stock', stock);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:7000/api/v1/create/product",
        formData,
        { withCredentials: true }
      );
      setLoading(false);
      console.log("RES==", res);
      if (res.statusText == "OK") {
        alert(res.data.message);
        navigate("/");
      }

      console.log("RESPONSE", formData);
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
          <div className="col-md-6 mx-auto mt-5 shadow-md border">
            
              <form onSubmit={handleSubmit}>
                <h1 className="text-center">Product</h1>
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
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
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

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Category
                  </label>
                  <select
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
                    <input type="file" onChange={handlePhotoChange}></input>
                  </span>
                </div>

                <div class="mb-3 form-check">
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
                  {loading ? "adding...." : "Add"}
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

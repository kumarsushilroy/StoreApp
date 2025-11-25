import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Adminlayout from "../../components/Adminlayout";
import { BASE_URL } from "../../Constant";

const AdminProdct = () => {
  const [adminContent, setAdminContent] = useState([]);

  // useEffect(()=>{
  //    const adminInfo = async ()=>{
  //     const admin = await axios.get('http://localhost:7000/api/v1/my-profile', {withCredentials:true});
  //     setAdminContent( admin?.data?.myself[0].product)
  //     console.log('ADMIN===', adminContent)
  // }
  // adminInfo();
  // },[])

  useEffect(() => {
    const adminInfo = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/my-profile`, {
        withCredentials: true,
      });

      const products = res?.data?.myself?.[0]?.product;
      setAdminContent(products);
    };

    adminInfo();
  }, []);
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
                      <img
                        style={{ width: "170px", height: "70px" }}
                        src={item.photo}
                        alt=""
                      />
                    </td>
                    <td className="d-flex gap-2">
                      <button className="btn bg-success">+Add</button>
                      <button className="btn bg-warning">Edit</button>
                      <button className="btn bg-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
    // </Adminlayout>
  );
};

export default AdminProdct;

import { useState } from "react";
import Adminlayout from "../../components/Adminlayout";
import Items from "./Items";
import { FaRandom } from "react-icons/fa";

const AdminDashboard = () => {
 
  return (
    <>
     <div className="container">
      <div className="row gap-1">
        <div className="col-md-3 card bg-warning shadow">
          <h3>Users</h3>
        </div>
        <div className="col-md-3 bg-success card shadow">
          <h3>Products</h3>
        </div>
        <div className="col-md-3 bg-secondary card shadow">
          Stocks
        </div>
        <div className="col-md-3 bg-danger card shadow">
          Stocks
        </div>
      </div>
     </div>
    </>
  );
};

export default AdminDashboard;

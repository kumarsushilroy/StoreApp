
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { MdDashboard } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { BsCollectionFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";


const Adminlayout = ()=>{


    const sidebarContent=[
        {
          path:'/admin/dashboard',
          heading:'Dashboard'  ,
          icon:<MdDashboard/>
        },
        {
          path:'/admin/addproduct',
          heading:'add product' ,
          icon:<IoAddCircle />
        },
        {
            path:'/admin/products',
            heading:'products',
            icon:<FaShoppingCart />
        },
        {
            path:'/admin/orders',
            heading:'orders',
            icon:<BsCollectionFill />
        },
        {
            path:'/admin/addcategory',
            heading:'add category',
            icon:<BiSolidCategoryAlt />
        }
    ]
    return (
        <div className="container-fluid">
            <Header/>
         <div className="row mt-2 gap-2 p-3">
            <div className="col-md-2 shadow p-5 rounded">
               <Sidebar sidebarContent={sidebarContent} />
            </div>
            <div className="col-md-9 shadow p-5 rounded">
                <Outlet/>
               
            </div>
         </div>
       {/* <Footer/> */}
       
        </div>
    )
}

export default Adminlayout;
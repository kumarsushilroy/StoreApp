
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";



const Adminlayout = ()=>{
    const sidebarContent=[
        {
          path:'/admin/addproduct',
          heading:'add product'  
        },
        {
            path:'/admin/products',
            heading:'products'
        },
        {
            path:'/admin/orders',
            heading:'orders'
        },
        {
            path:'/admin/addcategory',
            heading:'add category'
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
       <Footer/>
       
        </div>
    )
}

export default Adminlayout;

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";



const Adminlayout = ()=>{
    return (
        <div className="container-fluid">
            <Header/>
         <div className="row mt-2 gap-2 p-3">
            <div className="col-md-2 shadow p-5 rounded">
               <Sidebar/>
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

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";



const Adminlayout = ()=>{
    return (
        <div className="container-fluid">
         <div className="row mt-2 gap-2 p-3">
            <div className="col-md-2 shadow p-5 rounded">
               <Sidebar/>
            </div>
            <div className="col-md-9 shadow p-5 rounded">
                <Outlet/>
               
            </div>
         </div>
       
       
        </div>
    )
}

export default Adminlayout;
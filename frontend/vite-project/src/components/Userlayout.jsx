import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Userlayout = ()=>{
    return (
        <div>
       <Header/>
         <Outlet/>
        <Footer/>
        
        </div>
    )
}


export default Userlayout;
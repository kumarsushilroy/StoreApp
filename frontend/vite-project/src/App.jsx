import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Userlayout from "./components/Userlayout";
import Homepage from "./pages/Homepage";
import Protectedroute from "./components/Protectedroute";
import Adminlayout from "./components/Adminlayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/Addproduct";
import Register from "./pages/Register";
import Addcategory from "./pages/Admin/Addcategory";
import AdminProdct from "./pages/Admin/AdminProdct";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Shimer from "./components/Shimer";



function App() {
  return (
    <>
      <BrowserRouter>
      
        <Header />
        
       
        <Routes>
          
          <Route path="/" element={ <Userlayout/>} >
           
            <Route path='/' element={<Homepage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />  
             <Route path="/password/forgot" element={<ForgotPassword />} />
             <Route path="/password/reset/:token" element={<ResetPassword />} />
          </Route>
          
            


          <Route path="/admin" element={<Protectedroute><Adminlayout /></Protectedroute>}>

            <Route path="dashboard" element={
                <Protectedroute>
                  <AdminDashboard />
                </Protectedroute>
              }
            />

            <Route path="addproduct" element={
                <Protectedroute>
                  <AddProduct />
                </Protectedroute>
              }
            />

            <Route path="addcategory"  element={
                <Protectedroute>
                  <Addcategory />
                </Protectedroute>
              }
            />

            <Route  path="products" element={    
                <Protectedroute>
                  <AdminProdct />
                </Protectedroute>
              }
            />
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

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
import Orders from "./pages/Admin/Orders";
import ProductDetail from "./pages/productDetail";
import CartPage from "./pages/User/CartPage";
import Shipping from "./pages/User/Shipping";
import ConfirmOrder from "./pages/User/ConfirmOrder";
import PaymentMethod from "./pages/User/PaymentMethod";
import MyOrders from "./pages/User/MyOrders";
import OrderDetail from "./pages/User/OrderDetail";
import Profile from "./components/Profile";
import UpdatePassword from "./pages/User/UpdatePassword";
import UpdateProfile from './pages/User/UpdateProfile';
import UploadAvatar from './pages/User/UploadAvatar'



function App() {
  return (
    <>
    
      <BrowserRouter>
      
       
        <Routes>
          
          <Route path="/" element={ <Userlayout/>} >
           
            <Route path='/' element={<Homepage/>} />

            <Route path='/me/profile' element={<Profile/>}>
                <Route path='update-password' element={<UpdatePassword/>} />
                <Route path='update-profile' element={<UpdateProfile/>} />
                <Route path='upload-avatar' element={<UploadAvatar/>} />
            </Route>
           
            <Route path='/productDetail/:id' element={<ProductDetail/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />  
             <Route path="/password/forgot" element={<ForgotPassword />} />
             <Route path="/password/reset/:token" element={<ResetPassword />} />
             <Route path='/cart' element={<CartPage/>} />
             <Route path='/shipping' element={<Protectedroute><Shipping/></Protectedroute>} />
             <Route path='/confirm_order' element={<Protectedroute><ConfirmOrder/></Protectedroute>} />
             <Route path='/payment_method' element={<Protectedroute><PaymentMethod/></Protectedroute>} />
             <Route path='/user_orders' element={<Protectedroute><MyOrders/></Protectedroute>} />
              <Route path='/orderDetail/:id' element={<Protectedroute><OrderDetail/></Protectedroute>} />
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

            <Route path="orders" element={
              <Orders/>
              }/>

            

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
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;

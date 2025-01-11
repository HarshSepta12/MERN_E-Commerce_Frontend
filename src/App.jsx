import React, { Profiler, useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import SearchProduct from "./components/SearchProduct.jsx";
import Register from "./components/user/Register.jsx";
import Login from "./components/user/Login.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/user/Profile.jsx";
import Cart from './components/Cart.jsx'
import Address from "./components/user/Address.jsx";
import Checkout from "./components/Checkout.jsx";
import OrderConfirm from "./components/OrderConfirm.jsx";

const App = () => {
  const { data } = useContext(AppContext);
  return (
    <Router>
      <Navbar />
      <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  closeOnClick={false}
  pauseOnHover={true}
  draggable={true}
  theme="light"
  transition={Bounce}
/>
        <Routes>
          <Route path="/" element={<ShowProduct />}></Route>
          <Route path="/product/search/:term" element={<SearchProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/shipping" element={<Address/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orderconfirmation" element={<OrderConfirm/>} />
      
        </Routes>
      
    </Router>
  );
};

export default App;

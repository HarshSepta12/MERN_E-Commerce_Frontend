import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  // const url = "http://localhost:1000/api";
  const url = "https://mern-e-commerce-api-zd5h.onrender.com/api";
  const [products, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState("");
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
      setFilteredData(api.data.product);
      UserProfile();
      getUserCart();
      getUserAddress();
      User_order ();
    };
    fetchProduct();
  }, [token, reload]);

  useEffect(() => {
    let lsToken = localStorage.getItem("token");
    // console.log(lsToken);
    if (lsToken) {
      setToken(lsToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Register user
  const registerUser = async (name, email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      return api.data;
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return { success: false };
    }
  };

  // Login user
  const LoginUser = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      //console.log(api);
      // console.log(api.data.token);
      localStorage.setItem("token", api.data.token);
      setToken(api.data.token);
      setIsAuthenticated(true);
      return api.data;
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return { success: false };
    }
  };

  // logout
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  //user Profile
  const UserProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("User Profile", api.data.user);
    setUser(api.data.user);
  };

  // Add to Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
   // console.log("My Cart", api.data.messsage);
    toast.success(api.data.messsage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const getUserCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log(api.data.cart);
    setCart(api.data.cart);
  };

  // Decrease Qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    // console.log("Decrease Qty" , api.data);
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  //Delete Product or Remove Product
  const RemoveFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log("Remove Item from Cart ", api.data);
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  //Clear Cart
  const clearCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
   // console.log("Cart Clear", api.data);
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  //Clear Cart
  const Addaddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    // console.log("Addree Added" , api.data);
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    return api.data;
  };

  //Get User Latest Address
  const getUserAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //console.log(api.data.userAdress);
    setUserAddress(api.data.userAdress);
  };

    //Get User order 
    const User_order = async () => {
      const api = await axios.get(`${url}/payment/userorder`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      //console.log("User order", api.data.orders);
    setUserOrder(api.data);
    };
  


  return (
    <AppContext.Provider
      value={{
        products,
        registerUser,
        LoginUser,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        setToken,
        user,
        addToCart,
        cart,
        decreaseQty,
        RemoveFromCart,
        clearCart,
        Addaddress,
        userAddress,
      userOrder
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

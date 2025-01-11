import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";

import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate()
 // console.log("User Address", userAddress);

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    if (cart?.items) {
      cart.items.forEach((product) => {
        totalQty += product.qty;
        totalPrice += product.price;
      });
      setQty(totalQty);
      setPrice(totalPrice);
    }
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
    //console.log("Order Response", orderResponse);
     const {orderId, amount:orderAmount } = orderResponse.data;
     const options = {
      key: 'rzp_test_lq0BcPNN76gkKe',
      amount: orderAmount*100, 
      currency: 'INR',
      name: 'Harsh Septa',
      description: 'Harsh Septa',
      order_id: orderId, 
      handler:  async (response) =>{
      const paymentData = {
        orderId: response.razopay_order_id,
        paymentId: response.razopay_payment_id,
        signature: response.razorpay_signature,
        amount:orderAmount,
        orderItems: cart?.items,
        userId: user._id,
        userShipping: userAddress
      }
      
      const api = await axios.post(`${url}/payment/verify-payment`, paymentData);
    //  console.log("Rezorpay Response", api.data);
      if(api.data.success){
        navigate("/orderconfirmation");
        clearCart();
       
      }
     
    },
      prefill: {
        name: "Harsh Septa",
        email: "harshsepta49@gmail.com",
        contact: "7047916634"
    },
    notes: {
      address: "Vijay Nagar Indore"
    }
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
    } catch (error) {
     // console.log(error);
    }
  };

  


  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Product Details
              </th>
              <th scope="col" className="text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <TableProduct cart={cart} />
              </td>
              <td>
                <ul>
                  <li>Name: {userAddress?.fullName}</li>
                  <br />
                  <li>Phone: {userAddress?.phoneNumber}</li> <br />
                  <li>Country: {userAddress?.country}</li> <br />
                  <li>State: {userAddress?.state}</li> <br />
                  <li>City: {userAddress?.city} </li> <br />
                  <li>Pincode: {userAddress?.pincode}</li> <br />
                  <li>Near By: {userAddress?.address} </li> <br />
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button className="btn btn-outline-info btn-lg fw-bolder" onClick={() =>handlePayment() }>
          Process To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;

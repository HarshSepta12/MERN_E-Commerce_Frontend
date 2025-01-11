import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, RemoveFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

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

  // Check if cart is empty
  const isCartEmpty = cart?.items?.length === 0;

  return (
    <>
      {isCartEmpty ? (
        <div className="text-center my-5">
          <p>Your cart is empty. Continue shopping!</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="my-5 text-center">
            <button className="btn btn-outline-primary mx-4">Qty: {qty}</button>
            <button className="btn btn-outline-warning mx-4">Price: {price}</button>
          </div>

          {cart?.items?.map((product) => (
            <div
              key={product._id}
              style={{ borderRadius: "10px" }}
              className="container bg-dark my-5 p-4"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div className="cart_img">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
                <div className="cart_des">
                  <h4>Title: {product.title}</h4>
                  <h4>Price: {product.price}</h4>
                  <h4>Quantity: {product.qty}</h4>
                </div>
                <div className="cart_action">
                  <div
                    className="btn btn-primary mx-3"
                    onClick={() => decreaseQty(product.productId, 1)}
                  >
                    Qty--
                  </div>
                  <div
                    className="btn btn-info mx-3"
                    onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc
                      )
                    }
                  >
                    Qty++
                  </div>
                  <div
                    className="btn btn-danger my-3"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to remove this product?")) {
                        RemoveFromCart(product.productId);
                      }
                    }}
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="container text-center mb-5">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/shipping")}
            >
              Checkout
            </button>
            <button
              className="btn btn-danger mx-3"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear the cart?")) {
                  clearCart();
                }
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

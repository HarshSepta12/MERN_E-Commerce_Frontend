import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, RemoveFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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
  return (
    <>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Product Img</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Qty++</th>
            <th scope="col">Qty--</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody className="table-group-divider ">
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  style={{ width: "90px", height: "90px" }}
                />
              </th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.qty}</td>
              <td
                style={{ cursor: "pointer" }}
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
                <FaPlusCircle />
              </td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => decreaseQty(product.productId, 1)}
              >
                <FaMinusCircle />
              </td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to remove this product?"
                    )
                  ) {
                    RemoveFromCart(product.productId);
                  }
                }}
              >
                <MdOutlineRemoveShoppingCart />
              </td>
            </tr>
          ))}

          <tr>
            <td></td>
            <td colSpan={3}>Total</td>
            <td colSpan={2}>{price}</td>
            <td>{qty}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableProduct;

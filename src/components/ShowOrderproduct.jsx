import React, { useEffect, useState } from "react";


const ShowOrderproduct = ({ latestOrder }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    if (latestOrder) {
      latestOrder?.forEach((product) => {
        totalQty += product.qty;
        totalPrice += product.price;
      });
      setQty(totalQty);
      setPrice(totalPrice);
    }
  }, [latestOrder]);
  return (
    <>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Product Img</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
          </tr>
        </thead>
        <tbody className="table-group-divider ">
          {latestOrder?.map((product) => (
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
          
            </tr>
          ))}

          <tr>
            <td colSpan={2}>Total</td>
            <td>{price}</td>
            <td>{qty}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShowOrderproduct;

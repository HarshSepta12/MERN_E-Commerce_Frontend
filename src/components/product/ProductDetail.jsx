import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const url = "https://mern-e-commerce-api-zd5h.onrender.com/api";
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
      });
     // console.log(api.data.product);
      setProduct(api.data.product);
    };
    fetchProductDetails();
  }, [id]);
  return (
    <>
      <div
        className="container bg-secondary mt-5 "
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            style={{ width: "250px", height: "250px" }}
          />
        </div>
        <div className="right text-center">
          <h3 className="text-dark fw-bolder">{product?.title}</h3>
          <p className="text-dark fw-bolder">₹ {product?.price}</p>
          <p className="text-dark fw-bolder">{product?.description}</p>
          <div>
            <button className="btn btn-danger my-3 mx-3 fw-bold text-dark">
              ₹ {product?.price}
            </button>
            <button className="btn btn-warning fw-bold text-dark">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;

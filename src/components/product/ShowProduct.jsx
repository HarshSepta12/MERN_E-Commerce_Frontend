import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);
  return (
    <div className="container-fluid m-auto bg-secondary">
      <div className="row">
        {filteredData?.map((product) => (
          <div
            key={product._id}
            className=" m-auto my-3 col-md-4 d-flex justify-content-center align-items-center gap-2"
          >
            <div
              className="card bg-dark text-light text-center "
              style={{
                width: "20rem", // Fixed width for all cards
                height: "560px", // Fixed height for all cards
                maxWidth: "500px",
                maxHeight: "600px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="p-3" style={{ flexGrow: 1 }}>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "200px",

                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </Link>
                <div className="card-body" style={{ flexGrow: 1 }}>
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      ₹ {product.price}
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;

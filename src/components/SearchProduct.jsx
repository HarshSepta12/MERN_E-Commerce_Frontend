import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';

const SearchProduct = () => {
     const [searchProduct, setSearchProduct] = useState([]);
     const {products} = useContext(AppContext)
     const {term} = useParams();
     console.log(useParams());
     
     useEffect(() => {
          setSearchProduct(products.filter((data) => data.title.toLowerCase().includes(term.toLowerCase()))) 
     }, [term, products])
  return (
    <>
    <div className="text-center mt-5">
     
      <div className="container-fluid m-auto bg-secondary">
    <div className="row">
    {searchProduct?.map((product) => (
        <div key={product._id} className=" m-auto my-3 col-md-4 d-flex justify-content-center align-items-center gap-2">
          <div
            className="card bg-dark text-light text-center "
            style={{
              width: "20rem", // Fixed width for all cards
              height: "460px", // Fixed height for all cards
              maxWidth: "500px", 
              maxHeight: "460px",
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
              <div className="card-body"  style={{ flexGrow: 1 }}>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div className="my-3">
                <button className="btn btn-primary mx-3">
                ₹ {product.price}
                </button>
                <button className="btn btn-warning">
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
    </div>
    </>
  )
}

export default SearchProduct

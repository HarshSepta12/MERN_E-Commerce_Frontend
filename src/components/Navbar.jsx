import React, { useContext, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { products, setFilteredData, logout, isAuthenticated, cart } =
    useContext(AppContext);
  //console.log("User Cart" ,cart?.items?.length);

  const filterByCategory = (cat) => {
    if (cat === "No Filter") {
      setFilteredData(products); // Reset to all products when "No Filter" is clicked
    } else {
      setFilteredData(products.filter((data) => data.category === cat)); // Fixed comparison
    }
  };

  const filterByPrice = (price) => {
    if (price === "No Filter") {
      setFilteredData(products); // Reset to all products when "No Filter" is clicked
    } else {
      console.log(data.price);

      setFilteredData(products.filter((data) => data.price >= price)); // Fixed comparison
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={"/"} className="left">
            <h3>MERN E-Commerce</h3>
          </Link>
          <form onSubmit={submitHandler} className="search_bar">
            <div className="icon-container">
              <FaSearch className="search-icon" />
            </div>
            <input
              type="text"
              className="inp"
              placeholder="Search Your Product Here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative"
                >
                  <CiShoppingCart />
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="btn btn-danger mx-3"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-info mx-3">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-primary mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="item" onClick={() => filterByCategory("No Filter")}>
              No Filter
            </div>
            <div className="item" onClick={() => filterByCategory("Mobile")}>
              Mobile
            </div>
            <div className="item" onClick={() => filterByCategory("laptop")}>
              Laptop
            </div>
            <div className="item" onClick={() => filterByCategory("Camera")}>
              Camera
            </div>
            <div className="item" onClick={() => filterByCategory("Headphone")}>
              Headphone
            </div>
            <div className="item" onClick={() => filterByPrice("15999")}>
              15999
            </div>
            <div className="item" onClick={() => filterByPrice("25999")}>
              25999
            </div>
            <div className="item" onClick={() => filterByPrice("49999")}>
              49999
            </div>
            <div className="item" onClick={() => filterByPrice("69999")}>
              69999
            </div>
            <div className="item" onClick={() => filterByPrice("89999")}>
              89999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

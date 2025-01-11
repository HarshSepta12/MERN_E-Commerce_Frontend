import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Address = () => {
  const { Addaddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await Addaddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );
   // console.log("Address Added", result);
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
    if(result?.success){
      navigate('/checkout')
    }
  };
  return (
    <>
      <div
        className="container my-2 p-5 w-75"
        style={{
          border: "2px solid yellow",
          borderRadius: "10px",
          padding: "10px",
          height: "auto",
        }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form onSubmit={submitHandler} className="" style={{ padding: "16px" }}>
          <div className="row">
            <div className="row mb-3 col-md-4 ">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                FullName
              </label>

              <input
                type="text"
                className="form-control bg-dark text-light"
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="row mb-3 col-md-4 mx-2">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Country
              </label>

              <input
                type="text"
                className="form-control  bg-dark text-light"
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="row mb-3 col-md-4">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                State
              </label>

              <input
                type="text"
                className="form-control  bg-dark text-light"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="row mb-3 col-md-4 ">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                City
              </label>

              <input
                type="text"
                className="form-control bg-dark text-light"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="row mb-3 col-md-4 mx-2">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Pincode
              </label>

              <input
                type="number"
                className="form-control  bg-dark text-light"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="row mb-3 col-md-4">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                PhoneNumber
              </label>

              <input
                type="number"
                className="form-control  bg-dark text-light"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="row mb-3">
              <label className="form-label">Address/Nearby</label>
              <textarea
                className="form-control bg-dark text-light"
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                required
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="d-grid  col-4 mx-auto my-3">
            <button type="submit" className="btn btn-outline-primary ">
              Submit
            </button>
          </div>

         
        </form>
        {userAddress  && (
          <div className="d-grid col-4 mx-auto">
            <button className="btn btn-outline-warning" onClick={() => navigate('/checkout')}>Use Old Address</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;

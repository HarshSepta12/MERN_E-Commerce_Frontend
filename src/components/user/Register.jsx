import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast, Bounce} from "react-toastify"

const Register = () => {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { name, email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await registerUser(name, email, password);
    //   console.log(formData);
    setFormData({ name: "", email: "", password: "" });
    if(result.success){
     navigate("/login")
    }
  };
  return (
    <>
      <div
        className="container my-5 p-5"
        style={{
          width: "600px",
          border: "2px solid yellow",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <h1 className="text-center">User Rgister</h1>
        <form onSubmit={submitHandler}>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="d-grid  col-4 mx-auto my-3">
            <button type="submit" className="btn btn-primary ">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

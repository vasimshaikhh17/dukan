import React, { useState } from "react";
import logo from "../assets/logo.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./admin/others/Spinner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // console.log(formData,'fd  ')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(<Spinner/>);
    setDisable(true);
    try {
      const response = await axios.post(
        "https://dukaan-ds92.onrender.com/api/user/register",
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }
      );
      if (response.data.success) {
        // console.log(response.data)
        toast.success("Registration successful!");
        setMsg(response.data.msg);
        navigate("/login");
      } else {
        toast.error("User already registered. Please login.");
      }
    } catch (error) {
      // console.error("Error signing up:", error);
      toast.error("User already registered. Please login.");
      setMsg("Invalid Credentials");
      setDisable(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={logo} width={80} alt="Company Logo" className="mb-1" />
        <div className="bg-white p-8 rounded-lg box-shadow-3d w-full sm:w-96">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label htmlFor="firstname" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastname" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <button
              disabled={disable}
                type="submit"
                className={`  w-full  text-white py-2 px-4 rounded-lg  focus:outline-none  ${ disable ? 'bg-gray-600' : 'bg-indigo-600 focus:bg-indigo-700 hover:bg-indigo-700'}`}
              >
                Sign Up
              </button>
              <div className="text-center my-3">{msg}</div>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to={"/login"} className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;

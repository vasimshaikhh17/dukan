import React, { useState } from 'react';
import logo from '../assets/logo.gif'
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {

  const params = useParams()
  console.log(params)
  const [password,setPassword] = useState("")
const navigate = useNavigate()
  const onSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.put(`https://dukaan-ds92.onrender.com/api/user/reset-password/${params?.token}`,{password:password})
      if(response){
        toast.success("Password Reset Successfully")
       setTimeout(() => {
        navigate('/login')
       }, 2000);
      }else{
        toast.error("something went wrong")
      }
    } catch (error){
      throw new Error(error)
    }
  
  }
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={logo} width={80} alt="Company Logo" className="mb-1" />
        <div className="bg-white p-8 rounded-lg box-shadow-3d w-full sm:w-96">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Reset Password</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">New Password</label>
              <input value={password || ''} onChange={(e)=>setPassword(e.target.value)}   type="password" id="password" name="password" placeholder="Enter new password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-6">
              <button type="submit" onClick={onSubmit}  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Reset Password</button>
            </div>
          </form>
          {/* <div className="mt-4 text-center">
            <p className="text-gray-700">Remember your password? <Link to={"/login"} className="text-indigo-600 hover:underline">Login</Link></p>
          </div> */}
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default ResetPassword;

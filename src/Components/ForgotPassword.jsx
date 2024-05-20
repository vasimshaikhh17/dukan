import React, { useState } from 'react';
import logo from '../assets/logo.gif'
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email,setEmail] = useState("")
  const [disable,setDisable]=useState(false);
  const navigate = useNavigate()
  const spinner = (
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    );
    const [msg,setMsg] = useState("")
  const onSubmit = async(e)=>{
    e.preventDefault()
    setMsg(spinner)
    setDisable(true)
    try{
    const response = await axios.post("http://localhost:5000/api/user/forgot-password-token",{email:email})
      if(response.data.length > 10){
        toast.success("Please Check your Email")
        setMsg(response.data.msg)
      }else{
        toast.error("Invalid Email address")
      }
    }catch (error){
      toast.error("user not Found")
      setMsg("user not Found")
      setDisable(false)

    }
  }
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={logo} width={80} alt="Company Logo" className="mb-1" />
        <div className="bg-white p-8 rounded-lg box-shadow-3d w-full sm:w-96">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Forgot Password</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input value={email|| ""} onChange={(e)=>setEmail(e.target.value)}  type="email" id="email" name="email" placeholder="Enter your email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-6">
              <button disabled={disable} type="submit" onClick={onSubmit}  className={`  w-full  text-white py-2 px-4 rounded-lg  focus:outline-none  ${ disable ? 'bg-gray-600' : 'bg-indigo-600 focus:bg-indigo-700 hover:bg-indigo-700'}`}>Request Email</button>
            </div>
            <div className='text-center my-3'>{msg}</div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">Remember your password? <Link to={"/login"} className="text-indigo-600 hover:underline">Login</Link></p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default ForgotPassword;

import React, { useState } from 'react';
import logo from '../assets/logo.gif'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [value,setValue] = useState({
    email:"",password:""
  })
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
  const navigate = useNavigate()
  const [disable,setDisable]=useState(false);
  const handleChange = (e) => {
    // Destructure event target properties
    const { name, value } = e.target;
    // Update state based on input name
    setValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const onSubmit = async(e)=>{
    e.preventDefault()
    setMsg(spinner)
    setDisable(true)
    try{
      const response = await axios.post(`http://localhost:5000/api/user/login`, {
        email: value.email,
        password: value.password
      });

      if (response.data) {
        // console.log(response.data)
        toast.success(response.data.msg);
        setMsg(response.data.msg)
        localStorage.setItem('userData', JSON.stringify(response.data));
        if(response.data.role === 'admin'){
              navigate('/admin')
        }else{
            navigate('/')
        }
      } else {
        toast.error("Invalid Credentials");
      }
      
    }catch (error){
      console.error("Error:", error);
      toast.error("Invalid Credentials");
      setMsg("Invalid Credentials")
      setDisable(false)
    }
    
    console.log(value.email,value.password)
  }




  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={logo} width={80} alt="Company Logo" className="mb-1" />
        <div className="bg-white p-8 rounded-lg box-shadow-3d w-full sm:w-96">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input value={value.email} onChange={handleChange} type="email" id="email" name="email" placeholder="Enter your email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input value={value.password} onChange={handleChange} type="password" id="password" name="password" placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-6">
              <button onClick={onSubmit} type="submit"
              disabled={disable} className={`  w-full  text-white py-2 px-4 rounded-lg  focus:outline-none  ${ disable ? 'bg-gray-600' : 'bg-indigo-600 focus:bg-indigo-700 hover:bg-indigo-700'}`}  >Login</button>
              <div className='text-center my-3'>{msg}</div>
         

            </div>
            <div className="text-center">
              <Link to={"/forgotpassword"}  className="text-sm text-gray-600 hover:text-gray-800">Forgot password?</Link>
            </div>

          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">Don't have an account? <Link to={"/signup"} className="text-indigo-600 hover:underline">Sign up</Link></p>
          </div>
        </div>
        
      </div>
                  <ToastContainer />

    </>
  );
}

export default Login;

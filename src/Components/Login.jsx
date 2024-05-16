import React from 'react';
import logo from '../assets/logo.gif'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={logo} width={80} alt="Company Logo" className="mb-1" />
        <div className="bg-white p-8 rounded-lg box-shadow-3d w-full sm:w-96">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-6">
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Login</button>
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
    </>
  );
}

export default Login;

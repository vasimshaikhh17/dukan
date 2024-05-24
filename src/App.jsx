import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";

import Cart from "./Components/Cart";
import Details from "./Components/Details";
import Wishlist from "./Components/Wishlist";

import ResetPassword from "./Components/ResetPassword";
import Admin from "./Components/admin/dashboard/Admin"
import Users from "./Components/admin/users/Users";
import UserDetails from "./Components/admin/users/UserDetails";
import Categories from "./Components/product/Categories";
import AdminCategories from "./Components/admin/categories/AdminCategories";
import AdminCategoriesDetails from "./Components/admin/categories/AdminCategoriesDetails";
import AddNewCategory from "./Components/admin/categories/AddNewCategory";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/categories/:id" element={<Categories />} />

        {/* -----------------------admin routes----------------------- */}

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element ={<Users/>} />
        <Route path="/admin/user/:id" element={<UserDetails/>}/>

        
        <Route path="/admin/categories" element ={<AdminCategories/>} />
        <Route path="/admin/add-category" element = {<AddNewCategory/>}/>
        <Route path="/admin/category/:id" element ={<AdminCategoriesDetails/>} />



        {/* -----------------------admin routes----------------------- */}
      </Routes>
      {/*  */}
    </>
  );
};

export default App;

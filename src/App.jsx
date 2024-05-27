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
import SubCategories from "./Components/product/SubCategories";

import AddNewCategory from "./Components/admin/categories/AddNewCategory";
import Category from "./Components/admin/categories/Category";
import CategoryDetail from "./Components/admin/categories/CategoryDetail";
import AllProducts from "./Components/admin/product/AllProducts";
import DeleteSubCat from "./Components/admin/subCategory/DeleteSubCat";
import UpdateSubCat from "./Components/admin/subCategory/UpdateSubCat";
import CreateSubCat from "./Components/admin/subCategory/CreateSubCat";
import CreateProduct from "./Components/admin/product/CreateProduct";

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
        <Route path="/categories/:id" element={<SubCategories />} />

        {/* -----------------------admin routes----------------------- */}

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element ={<Users/>} />
        <Route path="/admin/user/:id" element={<UserDetails/>}/>

        <Route path="/admin/categories" element ={<Category/>} />
        <Route path="/admin/add-category" element = {<AddNewCategory/>}/>
        <Route path="/admin/category/:id" element ={<CategoryDetail/>} />


        
        
        <Route path="/admin/allproducts" element ={<AllProducts/>} />
        <Route path="/admin/create-product" element = {<CreateProduct/>}/>
        
        
        
        
        <Route path="/admin/delete-subCategory" element ={<DeleteSubCat/>} />
        <Route path="/admin/update-subCategory" element ={<UpdateSubCat/>} />
        <Route path="/admin/create-subCategory" element ={<CreateSubCat/>} />







        {/* -----------------------admin routes----------------------- */}
      </Routes>
      {/*  */}
    </>
  );
};

export default App;

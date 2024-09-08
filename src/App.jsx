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
// import Admin from "./Components/admin/dashboard/Admin";
import Users from "./Components/admin/users/Users";
import UserDetails from "./Components/admin/users/UserDetails";
// import SubCategories from "./Components/product/SubCategories";


import Category from "./Components/admin/categories/Category";
import CategoryDetail from "./Components/admin/categories/CategoryDetail";
import AllProducts from "./Components/admin/product/AllProducts";
import DeleteSubCat from "./Components/admin/subCategory/DeleteSubCat";
import UpdateSubCat from "./Components/admin/subCategory/UpdateSubCat";
import CreateSubCat from "./Components/admin/subCategory/CreateSubCat";
import CreateProduct from "./Components/admin/product/CreateProduct";
import UpdateCat from "./Components/admin/categories/UpdateCat";
import DeleteCat from "./Components/admin/categories/DeleteCat";
import About from "./Components/knowus/About";
import Contact from "./Components/knowus/Contact";
import ViewAllProduct from "./Components/product/ViewAllProduct";
import ShippingPolicy from "./common/footer/ShippingPolicy";
import PrivacyPolicy from "./common/footer/PrivacyPolicy ";
import HowToOrder from "./common/footer/HowToOrder ";
import TopProducts from "./Components/admin/product/TopProducts";
import DynamicPage from "./Components/product/DynamicPage";
import Checkout from "./Components/checkout/Checkout";
import Test from "./Components/test/Test";
import UpdateProduct from "./Components/admin/product/UpdateProduct";
import OrdersDetails from "./Components/admin/orderDetail/OrdersDetails";
// import CatAndSubCat from "./Components/admin/CatAndSubCat/CatAndSubCat";
import SubCatDynamic from "./Components/product/SubCatDynamic";
import Subcategory from "./Components/admin/CatAndSubCat/Subcategory";
import CatManagement from "./Components/admin/CatAndSubCat/CatManagement";
import CategoriesAndSubcategories from "./Components/admin/categories/CategoriesAndSubcategories";
import BrandPage from "./Components/admin/CatAndSubCat/BrandPage";

const App = () => {

  // toast.success("Success Notification !", {
  //   position: toast.POSITION.TOP_RIGHT,
  // });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* <Route path="/categories/:id" element={<SubCategories />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/view-products" element={<ViewAllProduct />} />

        <Route
          path="/category-products/:category"
          element={<ViewAllProduct />}
        />
       
        {/* <Route path="/:category" element={<DynamicPage />} /> */}
        <Route path="/products/:category" element={<DynamicPage />} />
        <Route path="/product/:subcategory" element={<SubCatDynamic/>} />

        {/* <Route path="/category-products/:category/?:subcategory" element ={<ViewAllProduct/>}/> */}

        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/how-to-order" element={<HowToOrder />} />

        {/* -----------------------admin routes----------------------- */}
        <Route path="/categories-and-subcategories" element={<CategoriesAndSubcategories />} />
        <Route path="/brand" element={<BrandPage />} />
        {/* <Route path="/admin" element={<Admin />} /> */}

        <Route path="/sub-categories" element={<Subcategory />} />
        <Route path="/categories" element={<CatManagement />} />


        <Route path="/admin" element={<Users />} />
        <Route path="/admin/user/:id" element={<UserDetails />} />

        <Route path="/admin/categories" element={<Category />} />

        <Route path="/admin/category/:id" element={<CategoryDetail />} />
        <Route path="/admin/update-category" element={<UpdateCat />} />
        <Route path="/admin/delete-category" element={<DeleteCat />} />
        <Route path="/admin/top-products" element={<TopProducts />} />

        <Route path="/admin/allproducts" element={<AllProducts />} />
        <Route path="/admin/create-product" element={<CreateProduct />} /> 
        <Route path="/admin/update-product/:id" element={<UpdateProduct />} /> 


        <Route path="/admin/delete-subCategory" element={<DeleteSubCat />} />
        <Route path="/admin/update-subCategory" element={<UpdateSubCat />} />
        <Route path="/admin/create-subCategory" element={<CreateSubCat />} />
        <Route path="all-orders" element={<OrdersDetails/>}/> 
 

        <Route path="/checkout" element={<Checkout/>} />

        //Test  
        <Route path="/test" element={<Test/>} />




        {/* -----------------------admin routes----------------------- */}
      </Routes>
      {/*  */}
    </>
  );
};

export default App;

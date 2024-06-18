import React, { useEffect, useState } from 'react'

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loaders from '../common/loaders/Loaders';
import Spinner from './admin/others/Spinner';
import {Link, useNavigate } from 'react-router-dom';
const FeaturedProducts = () => {

    const [product, setProducts] = useState([]);
    const [msg, setMsg] = useState();
    const [wishListIds, setWishListIds] = useState([]);
    const navigate = useNavigate();

    const getProducts = async () => {
        setMsg(<Loaders />);
        try {
          const result = await axios.get(
            `http://localhost:5000/api/product/getAll`
          );
          setMsg("");
          // const data = result.data;
          // console.log(data);
    
          const slicedProducts = result.data.slice(0, 8);
    
          setProducts(slicedProducts);
        } catch (error) {
          setMsg("Something Went Wrong");
        }
      };
    
      useEffect(() => {
        getUserData();
      }, []);
    
      const getUserData = async () => {
        setMsg(<Spinner />);
        const bearerToken = JSON.parse(localStorage.getItem("userData"));
        // console.log(bearerToken,'token')
        try {
          if (bearerToken) {
            const response = await axios.get(
              `http://localhost:5000/api/wishlist/${bearerToken._id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${bearerToken.token}`,
                },
              }
            );
            // console.log(response,'className=')
            if (response.data) {
              const products = response.data.products;
              const ids = products.map((product) => product._id);
              setWishListIds(ids);
              setMsg("");
            }
          }
        } catch (error) {
          setMsg("Something went wrong");
          toast.error("Something went wrong ");
        }
      };
    
      useEffect(() => {
        getProducts();
      }, []);
    
      const setToWishList = async (id) => {
        const bearerToken = JSON.parse(localStorage.getItem("userData"));
        try {
          if (!bearerToken) {
            toast.error("Login Required");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            const Response = await axios.put(
              `http://localhost:5000/api/wishlist/getWishlist`,
              { prodId: id },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${bearerToken.token}`,
                },
              }
            );
            if (Response.data) {
              await getUserData();
              toast.success(Response.data.msg , {position:'top-center'});
              // console.log(Response.data, "Wishlist");
            }
          }
        } catch (error) {
          // console.log(error);
          toast.error("Something went wrong");
        }
      };
  return (
   <>
   
   <div className="mt-14 mb-12 ">
        <div className="container mx-auto">
          {/* Header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h2 className="text-center md:text-2xl font-bold mb-6 sm:text-sm relative mt-6">
              Featured Products
              <span className="block w-16 h-1 bg-blue-500 rounded-lg absolute left-1/2 transform -translate-x-1/2 mt-2"></span>
            </h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
              asperiores modi Sit asperiores modi
            </p>
          </div>
          {!msg ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
                {/* card section */}
                {product.map((data) => (
                  <div
                    key={data?._id}
                    className="space-y-3 rounded-xl bg-white relative shadow-xl duration-300 group max-w-[250px] mx-auto"
                  >
                    <div className="relative w-full h-[350px]">
                      <Link to={`/details/${data?._id}`}>
                        <img
                          src={
                            data?.images[3] || "https://placehold.co/600x400"
                          }
                          alt=""
                          className="w-full h-full object-cover rounded-md hover:scale-105 duration-300"
                        />
                      </Link>
                      <div className="absolute top-2 right-3 flex w-8 h-8 bg-white items-center justify-center rounded-full">
                        <i
                          onClick={() => setToWishList(data?._id)}
                          className={`ri-heart-fill text-xl cursor-pointer ${
                            wishListIds?.includes(data?._id)
                              ? "text-red-500"
                              : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                    <div className="px-2 pb-3">
                      <h3 className="font-semibold">{data?.title}</h3>
                      <p className="text-sm text-gray-600">₹{data?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* view all button */}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              {msg}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8 mb-8">
        <button
          onClick={() => navigate("/view-products")}
          className="group bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center"
        >
          View All Products
          <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
        </button>
        <ToastContainer />
      </div></>
  )
}

export default FeaturedProducts
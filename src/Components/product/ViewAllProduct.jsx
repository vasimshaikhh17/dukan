import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import Layout from "../../layout/Layout";

import Loaders from "../../common/loaders/Loaders";
import Spinner from "../admin/others/Spinner";

const ViewAllProduct = () => {
  const [product, setProducts] = useState([]);
  const [msg, setMsg] = useState();
  const [wishListIds, setWishListIds] = useState([]);
  const navigate = useNavigate();

  // console.log(wishListIds, "wishListIds");

  const getProducts = async () => {
    setMsg(<Loaders />);
    try {
      const result = await axios.get(
        `http://localhost:5000/api/product/getAll`
      );
      setMsg("");
      // const data = result.data;
      // console.log(data);

      // const slicedProducts = result.data.slice(0, 3);

      setProducts(result.data);
    } catch (error) {
      setMsg("Something Went Wrong");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        console.log(response,'className=')
        if (response.data) {
          const products = response.data.products;
          const ids = products.map(product => product._id);
          setWishListIds(ids);
          setMsg("")
        }
      }
    } catch (error) {
      setMsg("Something went wrong");
      toast.error("Something went wrong ");
    }
  };

  const setToWishList = async (id) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    try {

      if(!bearerToken){
        toast.error("Login Required")
        setTimeout(()=>{
          navigate('/login')
        },3000)
      }else{
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
        if(Response.data){
          await getUserData()
          toast.success(Response.data.msg);
          // console.log(Response.data, "Wishlist");
        }
      }
     
    } catch (error) {
      // console.log(error);
      toast.error("Something went wronghhhhhhhhh");
    }
  };
  return (
    <Layout>
      <div className="mt-20 mb-12">
        <div className="container mx-auto">
          {/* Header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl mb-5 font-bold">Our Products</h1>
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
                    <div className="relative w-full h-[350px] ">
                      <Link to={`/details/${data?._id}`}>
                        <img
                          src={
                            data?.images[0] || "https://placehold.co/600x400"
                          }
                          alt=""
                          className="w-full h-full object-cover rounded-md hover:scale-105 duration-200"
                        />
                      </Link>
                      <div className="absolute top-2 right-3 flex w-8 h-8 bg-white items-center justify-center rounded-full">
                      <i
                          onClick={() => setToWishList(data?._id)}
                          className={`ri-heart-fill text-xl cursor-pointer ${wishListIds?.includes(data?._id)? "text-red-500": ""}`}
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
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              {msg}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default ViewAllProduct;

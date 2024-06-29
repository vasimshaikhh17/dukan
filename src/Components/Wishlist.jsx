import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Spinner from "./admin/others/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loaders from "../common/loaders/Loaders";
import nowishlist from "../assets/nowishlist.svg";
const Wishlist = () => {
  const [msg, setMsg] = useState("");
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setMsg(<Spinner />);
    const bearerToken = JSON.parse(localStorage.getItem("userData"));

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

        if (response.data) {
          setWishList(response?.data?.products);
          setMsg("");
        }
      }
    } catch (error) {
      setMsg("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getWishLists();
  }, []);

  const getWishLists = async () => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));

    setMsg(<Loaders />);
    try {
      const Response = await axios.put(
        `http://localhost:5000/api/wishlist/${bearerToken._id}`,
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
      }
      setMsg("");
    } catch (error) {
      setMsg("Something Went Wrong");
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
          toast.success("Product removed from wishlist" , {position: "top-center"});
          // console.log(Response.data, "Wishlist");
        }
      }
     
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="mt-4 mb-12">
        <div className="container mx-auto">
          {/* Header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h2 className="text-center md:text-2xl font-bold mb-6 sm:text-sm relative mt-6">
              Your Wishlist
              <span className="block w-16 h-1 bg-blue-500 rounded-lg absolute left-1/2 transform -translate-x-1/2 mt-2"></span>
            </h2>
          </div>

          {!msg ? (
            <div>
              {wishList.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
                  {wishList.map((wish) => (
                    <div
                      key={wish?._id}
                      className="space-y-3 rounded-xl bg-white relative shadow-xl duration-300 group max-w-[1000px]"
                    >
                      <Link to={`/details/${wish?._id}`}>
                        <img
                          src={
                            wish?.images[3] || "https://placehold.co/600x400"
                          }
                          alt=""
                          className="lg:h-[300px] lg:w-[250px] sm:h-[200px] object-cover rounded-md hover:scale-105 duration-300"
                        />
                      </Link>

                      <div>
                        <h3 className="font-semibold mx-2">{wish?.title}</h3>
                        <p className="text-sm text-gray-600 mx-2">
                          ₹{wish?.price}
                        </p>
                        <hr />
                        <div className="flex justify-between mx-2 py-2 items-center">
                          <button    onClick={() => setToWishList(wish?._id)} className="text-slate-500 hover:text-black duration-300 text-sm">
                            Remove
                          </button>
                          <button
                            onClick={() => navigate(`/details/${wish?._id}`)}
                            className="text-red-600 hover:text-red-700 duration-300 text-sm"
                          >
                            Move to bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className=" p-8 max-w-lg text-center">
                    <img
                      src={nowishlist}
                      alt="wishlist illustration"
                      className="mx-auto mb-4"
                    />
                    <p className="text-zinc-600 dark:text-zinc-300 mb-2">
                      Your wish is our command but you haven’t wishlisted any
                      products.
                    </p>
                    <p className="text-zinc-800 dark:text-zinc-100 font-semibold mb-6">
                      You can wishlist products and buy them later
                    </p>
                    <button
                      onClick={() => navigate("/view-products")}
                      className="group bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center"
                    >
                      View All Products
                      <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                    </button>
                  </div>
                </div>
              )}
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

export default Wishlist;

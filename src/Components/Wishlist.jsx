import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Spinner from "./admin/others/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loaders from "../common/loaders/Loaders";


const Wishlist = () => {
  // Example data for wishlist items
  const [msg, setMsg] = useState("");
  const [wishListIds, setWishListIds] = useState([]);
  const [wishList, setWishList] = useState([]);

  const navigate = useNavigate();

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
          `http://localhost:5000/api/user/${bearerToken._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken.token}`,
            },
          }
        );
        // console.log(response,'className=')
        if (response.data) {
          setWishListIds(response?.data?.getUser?.wishList);
          setMsg('')
        }
      }
    } catch (error) {
      setMsg("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  // console.log(wishListIds,'Something went wrong')

  useEffect(() => {
    getWishLists();
  }, [wishListIds]);

  const getWishLists = async () => {
    setMsg(<Loaders />);
    try {
      const arr = [];
      for (let i = 0; i < wishListIds.length; i++) {
        const response = await axios.get(
          `http://localhost:5000/api/product/get/${wishListIds[i]}`
        );
        arr.push(response.data);
        // console.log(response,'respp')
      }
      setMsg("");
      setWishList(arr);
    } catch (error) {
      setMsg("Something Went Wrong");
    }
  };

  // console.log(wishList);  

  return (
    <Layout>
      <div className="mt-20 mb-12">
        <div className="container mx-auto">
          {/* Header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl mb-5 font-bold">My Wishlist</h1>
            <p className="text-sm text-gray-600">
              Here are the products you have added to your wishlist.
            </p>
          </div>


          {
            !msg ? (  <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
                {/* card section */}
  
                
                {wishList.map((wish) => (
                  <div  key={wish?._id} className="space-y-3 rounded-xl bg-white relative shadow-xl duration-300 group max-w-[1000px]">
                      <Link to={`/details/${wish?._id}`}>
                      <img
                        src={wish?.images[0] || "https://placehold.co/600x400"}
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
                        <div className="flex justify-between mx-2 py-2  items-center">
                          <button className="text-slate-500  hover:text-black duration-300">
                            Remove
                          </button>
                          <button className="text-red-600 hover:text-red-700 duration-300">
                            Move to bag
                          </button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>) : (<div className="flex flex-col items-center justify-center h-96">
              {msg}
            </div>) 
          }
        
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Wishlist;

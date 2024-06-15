import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Spinner from "./admin/others/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loaders from "../common/loaders/Loaders";

const Wishlist = () => {
  const [msg, setMsg] = useState("");
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate()

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

        // console.log(Response.data, "Wishlist");
      }
      setMsg("");
      setWishList(arr);
    } catch (error) {
      setMsg("Something Went Wrong");
    }
  };

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

          {!msg ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
                {/* card section */}

                {wishList.map((wish) => (
                  <div
                    key={wish?._id}
                    className="space-y-3 rounded-xl bg-white relative shadow-xl duration-300 group max-w-[1000px]"
                  >
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
                        <button className="text-slate-500  hover:text-black duration-300 text-sm">
                          Remove
                        </button>
                        <button onClick={()=>navigate(`/details/${wish?._id}`)} className="text-red-600 hover:text-red-700 duration-300 text-sm">
                          Move to bag
                        </button>
                      </div>
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

export default Wishlist;

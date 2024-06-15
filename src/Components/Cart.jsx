import React, { useState, useEffect } from "react";
// import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./admin/others/Spinner";
import { ToastContainer, toast } from "react-toastify";
import LayoutOrder from "../layout/LayoutOrder";


const Cart = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    setMsg(<Spinner />);
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
      
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          "Content-Type": "application/json", // Add any other headers you need
          Authorization: `Bearer ${bearerToken.token}`,
        },
      });
      // console.log(response.data.products, "cartssssssssss");
      setMsg("");
      setCart(response.data.products);
    } catch (error) {
      // console.error("Error fetching cart:");
      setMsg("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  const handleRemoveFromCart = async (color, product, size) => {
    // console.log(color, product, size);
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    clg
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/remove",
        {
          productId: product,
          color: color,
          size: size,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      // console.log(res, "product removed from cart ");
      if (res.data) {
        getCart();
      }
      toast.success("Product  removed from cart");
    } catch (error) {
      // console.log(error, "error");
      toast.error("Something Went Wrong");
    }
  };

  return (
    <LayoutOrder>
    
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
      <h6 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-3">
            Shopping Cart
          </h6>
  
        {cart.map((carts, id) => {
          return (
            <div key={id} className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <img
                    className="h-20 w-20 dark:hidden"
                    src={carts.product.images[0]}
                    alt={carts.product.title}
                  />

                  <label htmlFor="counter-input" className="sr-only">
                    Choose quantit:
                  </label>
                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                      <button>-</button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter=""
                        className="w-20 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                        placeholder=""
                        defaultValue={carts.count}
                        required=""
                      />
                      <button>+</button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        ₹ {carts.price}
                      </p>
                    </div>
                  </div>
                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <p className="text-base font-medium text-gray-900  dark:text-white">
                      {carts.product.title}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-base font-medium text-gray-900  dark:text-white">
                        Color: {carts.product.color}
                      </p>
                      <p className="text-base font-medium text-gray-900  dark:text-white">
                        Size: {carts.size}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        onClick={() => {
                          handleRemoveFromCart(
                            carts?.color,
                            carts?.product._id,
                            carts?.size
                          );
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </LayoutOrder>
  );
};

export default Cart;

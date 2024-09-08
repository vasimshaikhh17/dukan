import React, { useEffect, useState } from "react";
import Spinner from "./admin/others/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import EmptyCart from "../layout/EmptyCart";
import Layout from "../layout/Layout";
import LayoutOrder from "../layout/LayoutOrder";


const CartItems = ( ) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const [cart, setCart] = useState([]);
  const[orderSummary, setOrderSummary] = useState({});
  const [count, setCount] = useState();
  const bearerToken = JSON.parse(localStorage.getItem("userData"));
  // console.log(count,'countTdjskdnmsk')

  // console.log(cart,'cart')
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    setMsg(<Spinner />);
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    if (bearerToken) {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        });
        setMsg("");
        setCart(response.data.products);
        setOrderSummary(response.data);
        console.log(response,"main cart cart")
      } catch (error) {
        console.log(error, "err Cart");
        setMsg("Something went wrong");
        toast.error("Something went wrong");
      }
    } else {
      toast.info("You are not Logged in , you are now being redirected to login page")
      setTimeout(() => {
          navigate('/login')
      }, 3000);
 
    }
  };

  const handleRemoveFromCart = async (color, product, size) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));

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
      if (res.data) {
        getCart();
      }
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (cart.length === 0 && location.pathname === "/checkout") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [cart, location.pathname, navigate]);

  if (cart.length === 0) {
    if (location.pathname === "/checkout") {
      return <span>Cart is empty. Redirecting to home...</span>;
    } else {
      return (
        <Layout>
          <EmptyCart />
        </Layout>
      );
    }
  }

  const handleIncrement = async (product) => {
    const outOfStock = product?.product?.quantity.every(
      ({ quantity }) => quantity === 0
    );
    // console.log(outOfStock,'outOfStock')
    const currentCount = product.count + 1;
    // console.log(currentCount,'currentCount')
    try {
      if (!outOfStock) {
        const res = await axios.put(
          "http://localhost:5000/api/cart/update",
          {
            productId: product?.product?._id,
            quantity: currentCount,
            color: product.color,
            size: product.size,
            price: product.price,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken.token}`,
            },
          }
        );
        if (res.data) {
          await getCart();
        }
        console.log(res, "resdnjslbadiyfhaskdd ");
      } else {
        alert("Out of Stock hpogya ha");
      }
    } catch (error) {
      console.log(error, "error");
      if (error?.response?.data?.message) {
        toast.error("Maximum quantity exceed");
      }
    }

    if (product) {
      setCount(product[0]?.count + 1);
    }
  };

  const handleDecrement = async (product) => {
    if (product.count <= 1) {
      toast.error("Atleast one item needed");
      return;
    }
    const currentCount = product.count - 1;
    try {
      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        {
          productId: product?.product?._id,
          quantity: currentCount,
          color: product.color,
          size: product.size,
          price: product.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (res.data) {
        await getCart();
      }
      // console.log(res, "resdnjslbadiyfhaskdd ");
    } catch (error) {
      console.log(error);
    }

    if (product) {
      setCount(product[0]?.count - 1);
    }
  };

  return (
    <>
      {location.pathname !== "/checkout" ? (
        <LayoutOrder orderSummary={orderSummary} >
  
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <h2 className="text-center md:text-2xl font-bold mb-6 sm:text-sm relative mt-6">
              Your Bag
              <span className="block w-16 h-1 bg-blue-500 rounded-lg absolute left-1/2 transform -translate-x-1/2 mt-2"></span>
            </h2>
            {cart?.map((carts, id) => (
              <div key={id} className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-2 mb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                      <img
                        className="h-20 w-20 dark:hidden"
                        src={
                          carts?.product?.images[0] ||
                          "https://placehold.co/600x400"
                        }
                        alt={carts?.product?.title}
                      />
                    </div>

                    <div className="md:w-1/2 md:min-w-0 flex-1 space-y-4">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {carts?.product?.title}
                      </p>
                      <div className="flex gap-3">
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          Color: {carts?.product?.color}
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          Size: {carts?.size}
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          Price: ₹ {carts?.product?.price}
                        </p>
                      </div>
                    </div>

                    <div className="md:w-1/4 flex md:flex-col md:items-end md:justify-between mt-3 justify-between">
                      <div className="flex items-center  mb-4 md:mb-0">
                        <button
                          className="bg-white text-black px-3 py-1 rounded-l-md border border-r-0 border-gray-300"
                          onClick={() => {
                            handleDecrement(carts);
                          }}
                          // disabled={count === 1}
                        >
                          -
                        </button>
                        <p className="bg-white text-black px-3 py-1 border border-gray-400 w-16 text-center">
                          {carts?.count}
                        </p>
                        <button
                          className="bg-white text-black px-3 py-1 rounded-r-md border border-l-0 border-gray-300"
                          onClick={() => {
                            handleIncrement(carts);
                          }}
                          // disabled={count === availableQuantity || isOutOfStock}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex justify-end mt-5">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                          onClick={() => {
                            handleRemoveFromCart(
                              carts?.product?.color,
                              carts?.product?._id,
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
            ))}
          </div>
        </LayoutOrder>
      ) : (

        cart?.map((carts, id) => (
          <div key={id} className="space-y-6">
            
            <div className="rounded-lg border border-gray-200 bg-red-500 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-2 mb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6 md:space-y-0">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img
                    className="h-20 w-20 dark:hidden"
                    src={carts?.product?.images[0]}
                    alt={carts?.product?.title}
                  />
                </div>

                <div className="md:w-1/2 md:min-w-0 flex-1 space-y-4">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {carts?.product?.title}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      Color: {carts?.product?.color}
                    </p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      Size: {carts?.size}
                    </p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      Price: ₹ {carts?.product?.price}
                    </p>
                  </div>
                </div>

                <div className="md:w-1/4 flex md:flex-col md:items-end md:justify-between mt-3 justify-between">
                  <div className="flex items-center  mb-4 md:mb-0">
                    <button
                      className="bg-white text-black px-3 py-1 rounded-l-md border border-r-0 border-gray-300"
                      onClick={() => {
                        handleDecrement(carts);
                      }}
                    >
                      -
                    </button>
                    <p className="bg-white text-black px-3 py-1 border border-gray-400 w-16 text-center">
                      {carts?.count}
                    </p>
                    <button
                      className="bg-white text-black px-3 py-1 rounded-r-md border border-l-0 border-gray-300"
                      onClick={() => {
                        handleIncrement(carts);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-end mt-5">
                    <button
                      type="button"
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                      onClick={() => {
                        handleRemoveFromCart(
                          carts?.product?.color,
                          carts?.product?._id,
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
        ))
    
      )}
    </>
  );
};

export default CartItems;

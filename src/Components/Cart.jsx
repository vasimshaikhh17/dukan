import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./admin/others/Spinner";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [cart, setCart] = useState([]);
  const products = [
    {
      id: 1,
      name: "Adidas Coreracer Men's Shoes",
      color: "Black + Zinc",
      size: "42",
      originalPrice: 99.99,
      discountedPrice: 49.99,
      discount: "-50% OFF",
      image:
        "https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-masculino/09/NQQ-4635-309/NQQ-4635-309_zoom1.jpg?ts=1675445414&ims=544x",
      quantity: 1,
    },
    {
      id: 2,
      name: "Nike Revolution 5",
      color: "White",
      size: "40",
      originalPrice: 89.99,
      discountedPrice: 44.99,
      discount: "-50% OFF",
      image:
        "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-masculino/01/NQQ-4636-001/NQQ-4636-001_zoom1.jpg?ts=1675445414&ims=544x",
      quantity: 1,
    },
    // Add more products as needed
  ];

  const goToAllProduct = () => {
    navigate("/view-products");
  };

  const gotoCheckout = () => {
    navigate("/checkout");
  };

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
      console.log(response.data.products, "cartssssssssss");
      setMsg("");
      setCart(response.data.products);
    } catch (error) {
      console.error("Error fetching cart:");
      setMsg("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  const handleRemoveFromCart = async (color, product, size) => {
    console.log(color, products, size);
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
      console.log(res, "product removed from cart ");
      if (res.data) {
        getCart();
      }
      toast.success("Product  removed from cart");
    } catch (error) {
      console.log(error, "error");
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <section className="pt-14">
        <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden px-4 md:px-14 py-7">
          {/* My Cart */}
          <div className="w-full md:w-2/3 flex flex-col h-full gap-4 p-4 overflow-y-auto">
            <p className="text-blue-900 text-xl font-extrabold">My cart</p>
            {/* {cart.map((carts)=>(
            <h1>{carts.product.title }</h1>
            <img src={carts.product?.images[0]} alt="" />
          ))} */}

            {cart.map((carts, id) => {
              return (
                <div
                  key={id}
                  className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm"
                >
                  <div className="flex flex-col md:flex-row gap-3 justify-between">
                    {/* Product Information */}
                    <div className="flex flex-row gap-6 items-center">
                      <div className="w-28 h-28">
                        <img
                          className="w-full h-full"
                          src={carts.product.images[0]}
                          alt={carts.product.title}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-lg text-gray-800 font-semibold">
                          {carts.product.title}
                        </p>
                        <p className="text-xs text-gray-600 font-semibold">
                          Color:{" "}
                          <span className="font-normal">
                            {carts.product.color}
                          </span>
                        </p>
                        <p className="text-xs text-gray-600 font-semibold">
                          Size:{" "}
                          <span className="font-normal">{carts.size}</span>
                        </p>
                      </div>
                    </div>
                    {/* Price Information */}
                    <div className="self-center text-center">
                      {/* <p className="text-gray-600 font-normal text-sm line-through">
                      ${product.originalPrice}
                      <span className="text-emerald-500 ml-2">
                        {product.discount}
                      </span>
                    </p> */}
                      <p className="text-gray-800 font-normal text-xl">
                        ${carts.price}
                      </p>
                    </div>
                    {/* Remove Product Icon */}
                    <div className="self-center">
                      <button
                        onClick={() => {
                          handleRemoveFromCart(
                            carts?.color,
                            carts?.product._id,
                            carts?.size
                          );
                        }}
                      >
                        <i className="ri-delete-bin-6-line"></i>
                      </button>
                    </div>
                  </div>
                  {/* Product Quantity */}
                  <div className="flex flex-row self-center gap-1 mt-4">
                    <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d1d5db"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      readOnly="readonly"
                      defaultValue={carts.count}
                      className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm"
                    />
                    <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill=""
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Purchase Resume */}
          <div className="flex flex-col w-full md:w-1/3 h-full gap-4 p-4 md:sticky md:top-14">
            <p className="text-blue-900 text-xl font-extrabold">
              Purchase Resume
            </p>
            <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">
                  {/* Subtotal ({products.length} Items) */}
                </p>
                <p className="text-end font-bold">$99.98</p>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Freight</p>
                <div>
                  <p className="text-end font-bold">$3.90</p>
                  <p className="text-gray-600 text-sm font-normal">
                    Arrives on Jul 16
                  </p>
                </div>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Discount Coupon</p>
                <a className="text-gray-500 text-base underline" href="#">
                  Add
                </a>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Total</p>
                <div>
                  <p className="text-end font-bold">$103.88</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={gotoCheckout}
                  className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md"
                >
                  Checkout
                </button>
                <button
                  onClick={goToAllProduct}
                  className=" transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md"
                >
                  ADD MORE PRODUCTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

         
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <img
                      className="h-20 w-20 dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                      alt="imac image"
                    />

                    <label htmlFor="counter-input" className="sr-only">
                      Choose quantity:
                    </label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button>-</button>
                        <input
                          type="text"
                          id="counter-input"
                          data-input-counter=""
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                          placeholder=""
                          defaultValue={2}
                          required=""
                        />
                        <button>+</button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          $1,499
                        </p>
                      </div>
                    </div>
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >
                        PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple
                        M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU,
                        Keyboard layout INT
                      </a>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                        >
                          <svg
                            className="me-1.5 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                            />
                          </svg>
                          Add to Favorites
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <svg
                            className="me-1.5 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          Removeeee
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $7,592.00
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -$299.00
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $99
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $799
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      $8,191.00
                    </dd>
                  </dl>
                </div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Proceed to Checkout
                </a>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </Layout>
  );
};

export default Cart;

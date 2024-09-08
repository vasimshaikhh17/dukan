import React, { useEffect, useState } from "react";
import LayoutOrder from "../../layout/LayoutOrder";
import Spinner from "../admin/others/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CartItems from "../CartItems";

import netbank from "../../assets/payments/netbank.jpeg";


const Checkout = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedAddIndex, setSelectedIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({
    postCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    landmark: "",
  });
  const [addressOff, setAddressOff] = useState(false);
  const [ordersOff, setOrdersOff] = useState(true);

  const [orderData, setOrderData] = useState();
  const bearerToken = JSON.parse(localStorage.getItem("userData"));

  console.log(selectedAddIndex, "selectedAddress");

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setMsg(<Spinner />);
    e.preventDefault();
    const bearerToken = JSON.parse(localStorage.getItem("userData"));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/add-address",
        {
          userId: bearerToken._id,
          newAddress: `${newAddress.address1}, ${newAddress.address2}, ${newAddress.city}, ${newAddress.state}, ${newAddress.postCode}, ${newAddress.landmark}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );

      setMsg("");
      setAddresses([...addresses, response.data.newAddress]);
      toggleAddressForm();
      toast.success("New addeess added");
      getUserData();
    } catch (error) {
      console.error("Error adding new address:", error);
      toast.error("Error adding new address");
      setMsg("something went wrong");
    }
  };

  const getCart = async () => {
    setMsg(<Spinner />);

    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken.token}`,
        },
      });
      setMsg("");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:");
      setMsg("Something went wrong");
    }
  };

  const getUserData = async () => {
    setMsg(<Spinner />);
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
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
        if (response.data) {
          setAddresses(response?.data?.getUser?.address);
          setMsg("");
        }
      }
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  const removeAdd = async (address) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    const url = "http://localhost:5000/api/user/remove-address";
    try {
      const Response = await axios.post(
        url,
        { userId: bearerToken._id, addressToRemove: address },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (Response.data.addresses) {
        toast.success(`Address Removed SuccessFull`);
        getUserData();
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  useEffect(() => {
    // return () => {
    getCart();
    getUserData();
    // };
  }, []);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  useEffect(() => {
    if (cart.products && cart.products.length > 0) {
      const transformedProducts = cart?.products?.map((item) => ({
        product: item?.product?._id,
        count: item?.count,
        color: item?.color,
        size: item?.size,
      }));
      setOrderData({
        products: transformedProducts,
        paymentIntent: {
          id: "pi_1GqIC8Ez4e5GAbFDS7hJI9K5",
          amount: 1000,
          currency: "usd",
          status: "succeeded",
        },
        orderby: cart?.orderby,
        addressIndex: selectedAddIndex,
      });
      // return()=>{transformedProducts}
    }
  }, [cart, selectedAddIndex]);

  const Order = async () => {
    const url = `http://localhost:5000/api/order/create-order-and-pay`;
    try {
      const Response = await axios.post(url, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken.token}`,
        },
      });
      console.log(Response, "payment Check");
      // alert()
      if (Response.data.paymentUrl) {
        window.location.href = Response.data.paymentUrl; // Redirect to PhonePe payment page
      }
    } catch (error) {
      console.log(error, "rerer");
      if (error.response.data.error) {
        toast.warn(error.response.data.error);
      }
    }
  };

  return (

    <LayoutOrder cart={cart} addressIndex={selectedAddIndex} >

      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div className="space-y-6">
          {addressOff ? (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="bg-green-400 dark:bg-white text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <i class="ri-check-double-line"></i>
                  </span>
                  <span className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                    Select Delivery Address
                  </span>
                </div>

                <button
                  className="text-blue-500 hover:text-blue-700 text-sm md:text-base focus:outline-none"
                  onClick={() => setAddressOff(false)}
                >
                  Change Address
                </button>
              </div>
              <hr className="my-3 border-gray-200 dark:border-gray-700" />
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="bg-zinc-600 dark:bg-white text-white rounded-full w-6 h-6 flex items-center justify-center">
                    1
                  </span>
                  <span className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                    Select Delivery Address
                  </span>
                </div>

                <button
                  className="text-blue-500 hover:text-blue-700 text-sm md:text-base focus:outline-none"
                  onClick={toggleAddressForm}
                >
                  + Add New Address
                </button>
              </div>
              <hr className="my-3 border-gray-200 dark:border-gray-700" />

              <form className="mt-4">
                <fieldset>
                  <legend className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                    Please select delivery address:
                  </legend>

                  <div className="mt-2">
                    {addresses.map((address, index) => (
                      <>
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 mb-2 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`add${index + 1}`}
                              name="address"
                              value={address}
                              checked={selectedAddress === address}
                              onChange={handleAddressChange}
                              onClick={() => setSelectedIndex(index)}
                              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            />
                            <label
                              htmlFor={`add${index + 1}`}
                              className="ml-2 text-sm md:text-base text-gray-800 dark:text-gray-200"
                            >
                              {address}
                            </label>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeAdd(address)}
                            className=" text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        {selectedAddIndex === index && (
                          <div className="flex justify-start pb-3">
                            <button
                              onClick={() => {
                                setAddressOff(true);
                                setOrdersOff(false);
                              }}
                              type="button"
                              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 duration-150 px-10"
                            >
                              Deliver Here
                            </button>
                          </div>
                        )}
                      </>
                    ))}

                    {addresses.length === 0 && (
                      <div className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                        No addresses available.
                      </div>
                    )}
                  </div>
                </fieldset>
              </form>
            </div>
          )}

          {ordersOff ? (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {addressOff ? (
                    <span className="bg-green-400 dark:bg-white text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <i class="ri-check-double-line"></i>
                    </span>
                  ) : (
                    <span className="bg-gray-600 dark:bg-white text-white rounded-full w-6 h-6 flex items-center justify-center">
                      2
                    </span>
                  )}
                  <span className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                    Order Summary
                  </span>
                </div>

                <button
                  onClick={() => setOrdersOff(false)}
                  className="text-blue-500 hover:text-blue-700 text-sm md:text-base focus:outline-none"
                >
                  Change Order
                </button>
              </div>
              <hr className="my-3 border-gray-200 dark:border-gray-700" />
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <span className="bg-zinc-600 dark:bg-white text-white rounded-full w-6 h-6 flex items-center justify-center">
                    2
                  </span>
                  <span>Order Summary</span>
                </div>

             
              </div>

              <div className="mt-4">
                <CartItems />
              </div>
              <div className="flex justify-start pb-3">
                <button
                  onClick={() => setOrdersOff(true)}
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 duration-150 px-10"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="bg-zinc-600 dark:bg-white text-white rounded-full w-6 h-6 flex items-center justify-center">
                  3
                </span>
                <span className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                  Select Delivery Address
                </span>
              </div>

              <button
                className="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-600 duration-200"
                onClick={Order}
              >
                Pay Now
              </button>
            </div>
            <hr className="my-3 border-gray-200 dark:border-gray-700" />
          </div>
        </div>

        {showAddressForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-4 max-h-full overflow-y-auto ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Address</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={toggleAddressForm}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Post Code</label>
                  <input
                    type="text"
                    name="postCode"
                    value={newAddress.postCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter postcode here"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Delivery state"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">City/Town</label>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Delivery city/town"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Address 1</label>
                  <input
                    type="text"
                    name="address1"
                    value={newAddress.address1}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter delivery address here"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Address 2</label>
                  <input
                    type="text"
                    name="address2"
                    value={newAddress.address2}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter delivery area, colony, street, sector, village"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={newAddress.landmark}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Eg. Behind the park"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                    onClick={toggleAddressForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </LayoutOrder>
  );
};

export default Checkout;

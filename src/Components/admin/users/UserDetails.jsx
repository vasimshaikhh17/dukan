import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../others/Spinner";
import Loaders from "../../../common/loaders/Loaders";

const user = {
  firstname: "Vasim",
  lastname: "Shaikh",
  email: "vasimn2@gmail.com",
  mobile: "8155918232",
  role: "admin",
  isBlocked: false,
  cart: [
    {
      id: 1,
      name: "Product 1",
      description: "Description of product 1111",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of product 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of product 3",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description of product 4",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description of product 5",
      image: "https://via.placeholder.com/150",
    },
  ],
  address: [],
  wishlist: [
    {
      id: 1,
      name: "Wishlist Product 1",
      description: "Description of wishlist product 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Wishlist Product 2",
      description: "Description of wishlist product 2",
      image: "https://via.placeholder.com/150",
    },
  ],
};

const UserDetails = () => {
  const [data, setData] = useState();
  const bearerToken = JSON.parse(localStorage.getItem("userData"));
  const params = useParams();
  const [msg, setMsg] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [wishList, setWishList] = useState([]);

  const navigate = useNavigate();
  // console.log(params);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setMsg(<Spinner />);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${params?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        setData(response?.data?.getUser);
        setMsg("");
        console.log(response.data.getUser,"userrrr")
      }
    } catch (error) {
      toast.error("Something went Wrong");
      setMsg("Something went wrong");
    }
  };

  const blockUser = async () => {
    setMsg(<Spinner />);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/block-user/${params?.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        await getUserData();
        // toast.success("User Blocked Successfully");
        setMsg("");
      }
    } catch (error) {
      toast.error("Something went Wrong");
      setMsg("Something went wrong!");
    }
  };

  const unBlockUser = async () => {
    setMsg(<Spinner />);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/unblock-user/${params?.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        await getUserData();
        // toast.success("User UnBlocked Successfully");
        setMsg("");
      }
    } catch (error) {
      toast.error("Something went Wrong");
      setMsg("Something went wrong");
    }
  };

  const deleteUser = async () => {
    setMsg(<Spinner />);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${deleteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        toast.success(
          "User Deleted Successfully, You are being redirected to dashboard!"
        );
        setMsg("");
        setTimeout(() => {
          navigate("/admin/users");
        }, 4000);
      }
    } catch (error) {
      toast.error("Something went Wrong");
      setMsg("Something went wrong");
      // console.log(error, "err");
    }
  };

  const confirmDeleteUser = () => {
    setDeleteId(params?.id);
  };

  useEffect(() => {
    getUserDataWish();
  }, []);

  const getUserDataWish = async () => {
    setMsg(<Spinner />);
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    // console.log(bearerToken,'token')

    try {
      if (bearerToken) {
        const response = await axios.get(
          `http://localhost:5000/api/wishlist/${params?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken.token}`,
            },
          }
        );
        console.log(response,'className=')
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

  // useEffect(() => {
  //   getWishLists();
  // }, []);

  // const getWishLists = async () => {
  //   // const bearerToken = JSON.parse(localStorage.getItem("userData"));

  //   setMsg(<Loaders />);
  //   try {
  //     const Response = await axios.put(
  //       `http://localhost:5000/api/wishlist/${params?.id}`,
  //       { prodId: id },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${bearerToken.token}`,
  //         },
  //       }
  //     );
  //     if (Response.data) {
  //       await getUserDataWish();

  //       // console.log(Response.data, "Wishlist");
  //     }
  //     setMsg("");
  //     setWishList(arr);
  //   } catch (error) {
  //     setMsg("Something Went Wrong");
  //   }
  // };


  return (
    <>
      <AdminLayout>
        {!msg ? (
          <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Details Box */}
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {data?.firstname} {data?.lastname}
                </h2>
                <p className="text-gray-600 mt-2">
                  <strong>Email:</strong> {data?.email}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Mobile:</strong> {data?.mobile}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Role:</strong> {data?.role}
                </p>

                <button
                  onClick={data?.isBlocked ? unBlockUser : blockUser}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  {data?.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="mt-4 mx-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete User
                </button>
              </div>

              {/* Address Box */}
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                {data?.address?.length > 0 ? (
                  data?.address?.map((addr, index) => (
                    <p key={index} className="text-gray-600 mt-2">
                      {addr}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600 mt-2">No addresses available.</p>
                )}
              </div>

              {/* Cart Box */}
              <div className="bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto">
                <h3 className="text-xl font-semibold text-gray-800">Cart</h3>
                {user.cart.length > 0 ? (
                  user.cart.map((item, index) => (
                    <div key={index} className="flex items-center mt-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 mr-4"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {item.name}
                        </p>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 mt-2">No items in cart.</p>
                )}
              </div>

              {/* Wishlist Box */}

          
              <div className="bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto">
                <h3 className="text-xl font-semibold text-gray-800">
                  Wishlist
                </h3>
                {wishList?.length > 0 ? (
                  wishList?.map((wish) => (
                    <div key={wish._id} className="flex items-center mt-4">
                      <img
                        src={wish?.images[0] || "https://placehold.co/600x400"}
                        alt={wish?.title}
                        className="w-16 h-16 mr-4"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {wish.title}
                        </p>
                        <p className="text-gray-600">{wish?.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 mt-2">No items in wishlist.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            {msg}
          </div>
        )}
      </AdminLayout>

      {deleteId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={deleteUser}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default UserDetails;

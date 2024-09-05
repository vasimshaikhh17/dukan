import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast} from "react-toastify";
import Layout from "../../layout/Layout";
import Loaders from "../../common/loaders/Loaders";
import Spinner from "../admin/others/Spinner";

const SubCatDynamic = () => {
  const { subcategory } = useParams(); // Fetch subcategory from URL params
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [wishListIds, setWishListIds] = useState([]);
  const navigate = useNavigate();

  // Fetch products based on the subcategory
  const getProducts = async () => {
    setMsg(<Loaders />);
    try {
      const result = await axios.get(`http://localhost:5000/api/product/getAll`);
      const filteredProducts = result.data.filter(product => 
        product.sub_category?.title.toLowerCase() === subcategory.toLowerCase()
      );
      setProducts(filteredProducts);
      setMsg("");
    } catch (error) {
      console.log("Error fetching products:", error);
      setMsg("Something Went Wrong");
    }
  };

  // Fetch wishlist data for the user
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
          const ids = response.data.products.map(product => product._id);
          setWishListIds(ids);
          setMsg("");
        }
      }
    } catch (error) {
      setMsg("Something went wrong");
      toast.error("Something went wrong ");
    }
  };

  // Add/remove from wishlist
  const setToWishList = async (id) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    try {
      if (!bearerToken) {
        toast.info("Login Required");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const response = await axios.put(
          `http://localhost:5000/api/wishlist/getWishlist`,
          { prodId: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken.token}`,
            },
          }
        );
        if (response.data) {
          await getUserData();
          toast.success(response.data.msg);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getProducts();
    getUserData();
  }, [subcategory]);

  return (
    <Layout>
      <div className="mt-4 mb-12">
        <div className="container mx-auto">
          {/* Header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h2 className="text-center md:text-2xl font-bold mb-6 sm:text-sm relative mt-6">
          {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} 
              <span className="block w-16 h-1 bg-blue-500 rounded-lg absolute left-1/2 transform -translate-x-1/2 mt-2"></span>
            </h2>
          </div>
          {!msg ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
                {/* Card section */}
                {products.map((data) => (
                  <div
                    key={data?._id}
                    className="space-y-3 rounded-xl bg-white relative shadow-xl duration-300 group max-w-[250px] mx-auto"
                  >
                    <div className="relative w-full h-[350px] ">
                      <Link to={`/details/${data?._id}`}>
                        <img
                          src={data?.images[0] || "https://placehold.co/600x400"}
                          alt={data?.title}
                          className="w-full h-full object-cover rounded-md hover:scale-105 duration-200"
                        />
                      </Link>
                      <div className="absolute top-2 right-3 flex w-8 h-8 bg-white items-center justify-center rounded-full">
                        <i
                          onClick={() => setToWishList(data?._id)}
                          className={`ri-heart-fill text-xl cursor-pointer ${
                            wishListIds?.includes(data?._id) ? "text-red-500" : ""
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
        
      </div>
    </Layout>
  );
};

export default SubCatDynamic;

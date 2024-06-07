import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./admin/others/Spinner";
import AllCategories from "./AllCategories";
import OurLatestCollection from "../OurLatestCollection";
import Loaders from "../common/loaders/Loaders";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [product, setProducts] = useState([]);
  const [msg, setMsg] = useState();
  const [wishListIds, setWishListIds] = useState([]);
  const navigate = useNavigate();
  
  // console.log(wishListIds,'wishListIds')

  const slides = [
    "https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fmycustomfolder%2FSummer-Shirts-2024.jpg&w=1200&q=75",
    "https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fmycustomfolder%2FSummer-Tshirts-2024.jpg&w=1200&q=75", // Add more image URLs as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change 5000 to adjust the interval (5 seconds)
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const getProducts = async () => {
    setMsg(<Loaders />);
    try {
      const result = await axios.get(
        `http://localhost:5000/api/product/getAll`
      );
      setMsg("");
      // const data = result.data;
      // console.log(data);

      const slicedProducts = result.data.slice(0, 4);

      setProducts(slicedProducts);
    } catch (error) {
      setMsg("Something Went Wrong");
    }
  };

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

  useEffect(() => {
    getProducts();
  }, []);

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
     
      {/* // --------------------image Slider ----------------------------- */}

      <div className="relative w-full pt-16">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden md:h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Link to={"/view-products"}>
                <img
                  src={slide}
                  className="w-full h-full object-cover "
                  alt={`Slide ${index + 1}`}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Controllers */}

        {/* <button
          className="absolute top-1/2 transform -translate-y-1/2 left-3 z-10 bg-white bg-opacity-50 p-2 rounded-full"
          onClick={goToPrevSlide}
        >
          <i className="ri-arrow-left-s-line text-lg font-bold"></i>
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-3 z-10 bg-white bg-opacity-50 p-2 rounded-full"
          onClick={goToNextSlide}
        >
          <i className="ri-arrow-right-s-line text-lg font-bold"></i>
        </button> */}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full  ${index === currentSlide ? "bg-red-600" : "bg-gray-600" }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      {/* // --------------------image Slider ----------------------------- */}

      <AllCategories />

      {/* --------------------------------our new launches----------------------------- */}
      <OurLatestCollection />

      {/* --------------------------------our new launches----------------------------- */}

      {/* ...................................our product----------------------------- */}

      <div className="mt-14 mb-12 ">
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
                    <div className="relative w-full h-[350px]">
                      <Link to={`/details/${data?._id}`}>
                        <img
                          src={data?.images[0] || "https://placehold.co/600x400"}
                          alt=""
                          className="w-full h-full object-cover rounded-md hover:scale-105 duration-300"
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
              {/* view all button */}
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
          className="group bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded inline-flex items-center"
        >
          View All Products
          <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
        </button>
        <ToastContainer />
      </div>

      {/* ...................................our products----------------------------- */}

      {/* .........................................latest collection--------------------- */}
      {/* <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              New Collection
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <li>
              <a href="#" className="group relative block">
                <img
                  src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Casual Trainers
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </a>
            </li>

            <li>
              <a href="#" className="group relative block">
                <img
                  src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Winter Jumpers
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </a>
            </li>

            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <a href="#" className="group relative block">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Skinny Jeans Blue
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section> */}
      {/* .........................................latest collection--------------------- */}
    </Layout>
  );
};

export default Home;

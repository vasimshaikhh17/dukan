import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./admin/others/Spinner";
import AllCategories from "./AllCategories";
import OurLatestCollection from "../OurLatestCollection";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);



  const slides = [
    "https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fmycustomfolder%2Fbanner-1-.jpg&w=1200&q=75",
    "https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fmycustomfolder%2Fbanner-2_1_.jpg&w=1200&q=75", // Add more image URLs as needed
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

  const productData = [
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      name: "Casual Shirts",
      price: "$35",
      ratings: "4.2",
    },

    // Add more products as needed
  ];

  return (
    <Layout>
      {/* // --------------------image Slider ----------------------------- */}

      <div className="relative w-full pt-16">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden md:h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide}
                className="w-full h-full object-cover object-top"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Controllers */}

        <button
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
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full bg-gray-400 ${
                index === currentSlide ? "bg-gray-800" : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      {/* // --------------------image Slider ----------------------------- */}

      <AllCategories />

      {/* --------------------------------our new launches----------------------------- */}
      <OurLatestCollection/>

      
      {/* --------------------------------our new launches----------------------------- */}

      {/* ...................................product----------------------------- */}

      <h2 className="text-center text-xl lg:text-2xl font-bold mb-10 pt-24">
        Our Latest Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto container mb-5">
        {productData.map((product, index) => (
          <div key={index} className="rounded-lg shadow-md overflow-hidden ">
            <a href="#" className="block">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain transition-transform hover:scale-105 "
              />
            </a>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <div className="text-gray-800 font-semibold">
                  {product.name}
                </div>
                <div className="text-gray-600">{product.price}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="text-gray-600">Ratings: {product.ratings}</div>
                <button className="text-2xl transition-transform hover:scale-125">
                  <i className="ri-heart-line"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ...................................product----------------------------- */}

      {/* .........................................latest collection--------------------- */}
      <section>
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
      </section>
      {/* .........................................latest collection--------------------- */}

      
    </Layout>
  );
};

export default Home;

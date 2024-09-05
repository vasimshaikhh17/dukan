import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

import AllCategories from "./AllCategories";
import OurLatestCollection from "../OurLatestCollection";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);


  // console.log(wishListIds,'wishListIds')

  const slides = [
    "https://cdn-media.powerlook.in/mycustomfolder/banner_10_.jpg?aio=w-1200",
    "https://cdn-media.powerlook.in/mycustomfolder/banner-1_3_.jpg?aio=w-1200", // Add more image URLs as needed
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



  return (
    <Layout>
      {/* // --------------------image Slider ----------------------------- */}

      <div className="relative w-full  ">
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
              className={`w-3 h-3 rounded-full  ${
                index === currentSlide ? "bg-red-600" : "bg-gray-600"
              }`}
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

      {/* ...................................featured product----------------------------- */}
      <FeaturedProducts />

      {/* ...................................featured products----------------------------- */}
    </Layout>
  );
};

export default Home;

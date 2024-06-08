import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from "react-toastify";

import { Link } from "react-router-dom";
import Loaders from "../common/loaders/Loaders";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState();
  const bearerToken = JSON.parse(localStorage.getItem("userData"));

  const settings = {
    autoplay: false,
    autoplaySpeed: 1200,
    arrows: true,
    pauseOnFocus: false,
    pauseOnHover: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    setMsg(<Loaders />);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/category/getAll",
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        setCategories(response.data);
        setMsg("");
      } else {
        toast.error("Something went wrong");
        setMsg("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="image-slider-container pt-12">
      <h2 className="text-center md:text-2xl  font-bold mb-4 sm:text-sm">
        Shop By Category
      </h2>
      {msg ? (
        <div className="flex flex-col items-center justify-center h-28">
        {msg}
      </div>
      ) : (
        <Slider {...settings} className="slider">
          {categories.map((category, index) => (
            <div key={index} className="slide">
              <Link to={`/categories/${category._id}`}>
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="category-image"
                />
              </Link>
              <div className=" text-center  md:text-xl text-[10px]">{category.title}</div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

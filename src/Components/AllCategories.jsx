import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast , ToastContainer} from "react-toastify";
import Spinner from "./admin/others/Spinner";
import { Link } from 'react-router-dom';


export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState();
  const bearerToken = JSON.parse(localStorage.getItem('userData'));

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
    setMsg(<Spinner />);
    try {
      const response = await axios.get('https://dukaan-ds92.onrender.com/api/category/getAll', {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${bearerToken.token}`,
        },
      });
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
<h2 className="text-center text-xl lg:text-2xl font-bold mb-4">
          Shop By Category
        </h2>
      {msg ? (
        msg
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
              <div className="slide-name text-center">{category.title}</div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import AllCategories from "./Navbar/AllCategories";
import axios from "axios";
import { toast , ToastContainer} from "react-toastify";
import Spinner from "./admin/others/Spinner";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [category,setCategory] = useState('')
  const bearerToken = JSON.parse(localStorage.getItem('userData'))
  const [msg,setMsg] = useState()

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

useEffect(()=>{
  getAllCategory()
},[])

  const getAllCategory = async()=>{
    setMsg(<Spinner/>)
    try{
    const response = await axios.get('https://dukaan-ds92.onrender.com/api/category/getAll',
      { headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${bearerToken.token}`
      },})
      if(response.data){
        setCategory(response?.data)
        setMsg("")
      }else{
        toast("Something went Wrong")
      setMsg("Something went Wrong")
      }
      console.log(response)
    }catch (error){
      toast("Something went Wrong")
      setMsg("Something went Wrong")
    }
  }


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

  const circles = [
    {
      color: "bg-red-500",
      name: "Red",
      image:
        "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
    },
    {
      color: "bg-blue-500",
      name: "Blue",
      image:
        "https://rukminim1.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100",
    },
    {
      color: "bg-green-500",
      name: "Green",
      image:
        "https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0139228b2f7eb413.jpg?q=100",
    },
    {
      color: "bg-yellow-500",
      name: "Yellow",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdX-8yO4BqWlggZbYmhnUdtfNKM9sCKP9XQQ&s",
    },
    {
      color: "bg-yellow-500",
      name: "Yellow",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdX-8yO4BqWlggZbYmhnUdtfNKM9sCKP9XQQ&s",
    },
    {
      color: "bg-yellow-500",
      name: "Yellow",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdX-8yO4BqWlggZbYmhnUdtfNKM9sCKP9XQQ&s",
    },
    {
      color: "bg-yellow-500",
      name: "Yellow",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdX-8yO4BqWlggZbYmhnUdtfNKM9sCKP9XQQ&s",
    },
    {
      color: "bg-yellow-500",
      name: "Yellow",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdX-8yO4BqWlggZbYmhnUdtfNKM9sCKP9XQQ&s",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/61jiY0UYqyL._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: false,
    },

    {
      id: 2,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/81hf8+fckuL._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: true,
    },
    {
      id: 3,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/61fLAAKKV8L._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: true,
    },
    {
      id: 4,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/61WIfiQFknL._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: true,
    },
    {
      id: 5,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/61MxGnqBzdL._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: false,
    },
    {
      id: 6,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/71mRYklHcjL._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: false,
    },
    {
      id: 7,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/61IytOl+V7L._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: true,
    },
    {
      id: 8,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc:
        "https://m.media-amazon.com/images/I/61T6P+UfTkL._AC_UL480_FMwebp_QL65_.jpg",
      link: "#",
      inWishlist: true,
    },
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

      {/* //---------------------categories-------------------------------- */}

      <div className="pt-12">
        <h2 className="text-center text-xl lg:text-2xl font-bold mb-4">
          Shop By Category
        </h2>
        <div className="bg-slate-50 lg:h-32 flex items-center lg:mx-4">
          <div className="container mx-auto">
            <div className=" grid grid-cols-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 gap-4 overflow-x-auto lg:overflow-x-hidden whitespace-nowrap">
              {category ? category?.map((el, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full cursor-pointer `}>
                   <Link to={`/categories/${el._id}`}>
                    <img
                      src={el.imageUrl}
                      alt={el.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                    </Link>
                  </div>
                  <div className="mt-2 text-center sm:text-[10px] md:text-[10px] lg:text-[15px]  ">{el.title}</div>
                </div>
              )) : <div className="">{msg}</div>   }
            </div>
          </div>
        </div>
      </div>

      {/* //---------------------categories-------------------------------- */}
{/* <div className="pt-12">


      <AllCategories/>
</div> */}

      {/* --------------------------------our new launches----------------------------- */}

      <section className="pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
          Our New Launches
        </h2>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
              <div className="mx-auto max-w-md text-center lg:text-left">
                <header>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Latest Sale
                  </h2>

                  <p className="mt-4 text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quas rerum quam amet provident nulla error!
                  </p>
                </header>

                <a
                  href="#"
                  className="mt-8 inline-block rounded border border-gray-900 bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
                >
                  Shop All
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <a href="#" className="group block">
                    <img
                      src="https://m.media-amazon.com/images/I/717Szt9URYL._AC_UL480_FMwebp_QL65_.jpg"
                      alt=""
                      className="aspect-square w-full rounded object-contain"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Simple Watch
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">$150</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#" className="group block">
                    <img
                      src="https://m.media-amazon.com/images/I/6150O1H56aL._AC_UL480_FMwebp_QL65_.jpg"
                      alt=""
                      className="aspect-square w-full rounded object-contain"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Simple Watch
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">$150</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* --------------------------------our new launches----------------------------- */}

      {/* ...................................product----------------------------- */}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
            Our Latest Collection
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div className="group relative" key={product.id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <img
                    src={product.imageSrc}
                    alt={`Front of men's ${product.name} in ${product.color}.`}
                    className="h-full w-full object-cover object-top lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product.id}`}>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 focus:outline-none ${
                        product.inWishlist ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      <i
                        className={`${
                          product.inWishlist ? "ri-heart-fill" : "ri-heart-line"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
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

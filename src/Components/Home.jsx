import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fmycustomfolder%2Fbanner-1-.jpg&w=1200&q=75",
    "https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fmycustomfolder%2Fbanner-2_1_.jpg&w=1200&q=75",   // Add more image URLs as needed

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000); // Change 5000 to adjust the interval (5 seconds)
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
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
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#", inWishlist: false
    },

    {
      id: 2,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#", inWishlist: true
    },
    {
      id: 3,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#", inWishlist: true
    },
    {
      id: 4,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#", inWishlist: true
    },
    {
      id: 5,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#", inWishlist: false
    },
    {
      id: 6,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#", inWishlist: false
    },
    {
      id: 7,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#", inWishlist: true

    },
    {
      id: 8,
      name: "Basic Tee",
      color: "Black",
      price: "$35",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      link: "#",
      inWishlist: true
    },

  ];





  return (

    <>


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

      <div>
        <h2 className="text-center text-xl lg:text-2xl font-bold mb-4">Shop By Category</h2>
        <div className="bg-slate-50 lg:h-32 flex items-center lg:mx-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-4 lg:grid-cols-8 md:grid-cols-4 sm:grid-cols- gap-4">
              {circles.map((circle, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full cursor-pointer `}>

                    <img
                      src={circle.image}
                      alt={circle.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-center">{circle.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* //---------------------categories-------------------------------- */}

      {/* ...................................product----------------------------- */}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Our Latest Collection</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div className="group relative" key={product.id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <img src={product.imageSrc} alt={`Front of men's ${product.name} in ${product.color}.`} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    <button onClick={() => toggleWishlist(product.id)} className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 focus:outline-none ${product.inWishlist ? 'text-red-500' : 'text-gray-500'}`}>
                      <i className={`${product.inWishlist ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ...................................product----------------------------- */}

    </>
  );
};

export default Home;

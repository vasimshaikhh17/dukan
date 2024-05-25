import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Components/admin/others/Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const OurLatestCollection = () => {
  const [productListId, setproductListId] = useState("");
  const [productList, setProductList] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const TopProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product/top-product-list"
        );
        if (response && response.data) {
          setproductListId(response.data.productId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    TopProducts();
  }, []);

  useEffect(() => {
    if (productListId.length > 0) {
      OurLatestCollection();
    }
  }, [productListId]);

  const OurLatestCollection = async () => {
    setMsg(<Spinner />);
    try {
      const arr = [];
      for (let i = 0; i < productListId.length; i++) {
        const response = await axios.post(
          `http://localhost:5000/api/product/get/${productListId[i]}`
        );
        arr.push(response.data);
        // console.log(response)
      }
      setProductList(arr);
    } catch (error) {
      setMsg("Something Went Wrong");
    }
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: true,
    pauseOnFocus: false,
    pauseOnHover: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
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

  return (
    <section className="pt-16">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
        Our Latest Collection
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                  rerum quam amet provident nulla error!
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

          <div className="lg:col-span-2 lg:py-8  container mx-auto">
            <Slider {...settings} className="slider">
              {productList && productList.length > 0 ? (
                productList.map((product, index) => (
                  <div key={index} className="px-4">
                    <div className="group block product-item">
                      <img
                        src={
                          product.images[0] || "https://via.placeholder.com/150"
                        }
                        alt={product.title}
                        className="aspect-square w-full rounded object-contain"
                      />
                      <div className="mt-3">
                        <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-700">
                          ${product.price}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>{msg}</div>
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLatestCollection;

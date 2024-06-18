import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import Loaders from "../common/loaders/Loaders";
import { ToastContainer, toast } from "react-toastify";
import FeaturedProducts from "./FeaturedProducts";


const Details = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [msg, setMsg] = useState("");
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [showSelectSizeMsg, setShowSelectSizeMsg] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [count, setCount] = useState(1);
  const [maxCountReached, setMaxCountReached] = useState(false); // State to track max count reached
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setMsg(<Loaders />);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/get/${params.id}`
        );
        setProduct(response.data);
        setMainImage(response.data.images[0]);
        setMsg("");
        const outOfStock = response.data.quantity.every(
          ({ quantity }) => quantity === 0
        );
        setIsOutOfStock(outOfStock);
        console.log(response, "productdetail");
      } catch (error) {
        setMsg("Something Went Wrong");
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    
    if (!selectedSize) {
      setShowSelectSizeMsg(true);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500); // Remove shake animation after 500ms
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/cart/add",
          {
            productId: product._id,
            quantity: count,
            color: product.color,
            size: selectedSize,
            price: product.price,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken.token}`,
            },
          }
        );
        console.log(res,"product added to cart ");
        toast.success("Product added to cart successfully")
      } catch (error) {
        console.log(error, "error");
        if(error.response.data.message.length > 25){
          toast.warn(error.response.data.message)
        }else{
          toast.error("Something Went Wrong")

        }

      }
    }
  };

  const handleSizeSelect = (size, quantity) => {
    setSelectedSize(size);
    setAvailableQuantity(quantity);
    setShowSelectSizeMsg(false);
    setCount(1); // Reset count to 1 when a new size is selected
    setMaxCountReached(false); // Reset max count reached when a new size is selected
  };

  const handleIncrement = () => {
    if (!selectedSize) {
      setShowSelectSizeMsg(true);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500); // Remove shake animation after 500ms
    }
    if (count < availableQuantity) {
      setCount(count + 1);
      if (count + 1 === availableQuantity) {
        setMaxCountReached(true); // Set max count reached to true when count reaches available quantity
      }
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setMaxCountReached(false); // Reset max count reached when count is decremented
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          {msg}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="max-w-6xl mx-auto p-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="flex-1 md:order-2">
              <img
                src={mainImage}
                alt="Product"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0 md:order-1 mr-3">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product thumbnail ${index}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer transform hover:scale-110 transition-transform duration-200"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl text-green-500 mb-4">₹{product.price}</p>
            <p className="mb-4">{product.description}</p>
            <p className="mb-4">{product.color}</p>
            <div className="flex">
              <label className="mb-2 font-bold">Select Size: </label>
              <div>
                {showSelectSizeMsg && (
                  <p className="text-red-500 "> &nbsp; Select size first</p>
                )}
              </div>
            </div>

            <div
              className={`flex space-x-2 mb-4 ${shakeAnimation ? "shake" : ""}`}
            >
              {product.quantity.map(({ size, quantity }) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size, quantity)}
                  disabled={quantity === 0}
                  className={`p-2 border rounded-lg ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  } ${
                    quantity === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex rounded-md mb-4">
              <button
                className="bg-white text-black px-3 py-1 rounded-l-md border border-r-0 border-gray-300"
                onClick={handleDecrement}
                disabled={count === 1}
              >
                -
              </button>
              <p className="bg-white text-black px-3 py-1 border border-gray-400 w-16 text-center">
                {count}
              </p>
              <button
                className="bg-white text-black px-3 py-1 rounded-r-md border border-l-0 border-gray-300"
                onClick={handleIncrement}
                disabled={count === availableQuantity || isOutOfStock}
              >
                +
              </button>
            </div>

            {maxCountReached && (
              <p className="text-red-500">Maximum units selected</p>
            )}

            {isOutOfStock && (
              <p className="text-red-500">Product Out of Stock</p>
            )}

            <div className="mt-auto self-start">
              <button
                className={`py-2 px-4 rounded-lg shadow-lg transition-colors duration-200 ${
                  isOutOfStock
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProducts/>
      <ToastContainer/>
    </Layout>
  );
};

export default Details;

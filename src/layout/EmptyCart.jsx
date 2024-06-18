import React from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import emptycart from "../assets/bagempty.png";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <>
   
   <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
      <div className="text-center mb-10 max-w-[600px] mx-auto  ">
            <h2 className="text-center md:text-2xl font-bold  sm:text-sm relative ">
              Your Bag
              <span className="block w-16 h-1 bg-blue-500 rounded-lg absolute left-1/2 transform -translate-x-1/2 mt-2"></span>
            </h2>
          </div>

        <div className="flex items-center justify-center mb-10">
          <div className=" p-8 max-w-lg text-center">
            <img
            width={300}
              src={emptycart}
              alt="wishlist illustration"
              className="mx-auto mb-4"
            />
            <p className="text-zinc-600 dark:text-zinc-300 mb-2">
            Hey, it feels so light!
            </p>
            <p className="text-zinc-800 dark:text-zinc-100 font-semibold mb-6">
            There is nothing in your bag. Let's add some items.
            </p>
            <button
              onClick={() => navigate("/wishlist")}
              className="group bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center"
            >
              ADD ITEMS FROM WISHLIST
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>
          </div>
        </div>
        </div>
 
    </>
  );
};

export default EmptyCart;

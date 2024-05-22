import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
// import { HeartIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/outline";

const wishlistItems = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product.",
    price: "$99.99",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is another great product.",
    price: "$199.99",
    imageUrl: "https://via.placeholder.com/150",
  },
  // Add more items as needed
];

const Wishlist = () => {
  return (
    <Layout>
<div className="bg-gray-100 min-h-screen p-5 pt-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-5">My Wishlist</h1>
        <ul className="space-y-4">
          {wishlistItems.map((item) => (
            <li key={item.id} className="bg-white p-5 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-40 w-full sm:h-20 sm:w-20 object-cover rounded mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                <p className="text-gray-600 mb-1">{item.description}</p>
                <p className="text-gray-800 font-semibold">{item.price}</p>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Link
                  to="/cart"
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {/* <ShoppingCartIcon className="h-5 w-5 mr-2" /> */}
                  <i className="ri-shopping-cart-2-line"></i>
                  <span className="ml-2">Add to Cart</span>
                </Link>
                <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  {/* <TrashIcon className="h-5 w-5 mr-2" /> */}
                  <i className="ri-delete-bin-line"></i>
                  <span className="ml-2">Remove</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    </Layout>
    
  );
};

export default Wishlist;

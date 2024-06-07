import React, { useState } from "react";
import Layout from "../layout/Layout";

const Cart = () => {
  const products = [
    {
      id: 1,
      name: "Adidas Coreracer Men's Shoes",
      color: "Black + Zinc",
      size: "42",
      originalPrice: 99.99,
      discountedPrice: 49.99,
      discount: "-50% OFF",
      image:
        "https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-masculino/09/NQQ-4635-309/NQQ-4635-309_zoom1.jpg?ts=1675445414&ims=544x",
      quantity: 1,
    },
    {
      id: 2,
      name: "Nike Revolution 5",
      color: "White",
      size: "40",
      originalPrice: 89.99,
      discountedPrice: 44.99,
      discount: "-50% OFF",
      image:
        "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-masculino/01/NQQ-4636-001/NQQ-4636-001_zoom1.jpg?ts=1675445414&ims=544x",
      quantity: 1,
    },
    
    // Add more products as needed
  ];

  return (
    <Layout>
      <section className="pt-14">
        <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden px-4 md:px-14 py-7">
          {/* My Cart */}
          <div className="w-full md:w-2/3 flex flex-col h-full gap-4 p-4 overflow-y-auto">
            <p className="text-blue-900 text-xl font-extrabold">My cart</p>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm"
              >
                <div className="flex flex-col md:flex-row gap-3 justify-between">
                  {/* Product Information */}
                  <div className="flex flex-row gap-6 items-center">
                    <div className="w-28 h-28">
                      <img
                        className="w-full h-full"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-lg text-gray-800 font-semibold">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-600 font-semibold">
                        Color:{" "}
                        <span className="font-normal">{product.color}</span>
                      </p>
                      <p className="text-xs text-gray-600 font-semibold">
                        Size:{" "}
                        <span className="font-normal">{product.size}</span>
                      </p>
                    </div>
                  </div>
                  {/* Price Information */}
                  <div className="self-center text-center">
                    <p className="text-gray-600 font-normal text-sm line-through">
                      ${product.originalPrice}
                      <span className="text-emerald-500 ml-2">
                        {product.discount}
                      </span>
                    </p>
                    <p className="text-gray-800 font-normal text-xl">
                      ${product.discountedPrice}
                    </p>
                  </div>
                  {/* Remove Product Icon */}
                  <div className="self-center">
                    <button>
                      <svg
                        height="24px"
                        width="24px"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z" />
                          <g>
                            <rect height={241} width={14} x={249} y={160} />
                            <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                            <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Product Quantity */}
                <div className="flex flex-row self-center gap-1 mt-4">
                  <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d1d5db"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    readOnly="readonly"
                    defaultValue={product.quantity}
                    className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm"
                  />
                  <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill=""
                      stroke="#9ca3af"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Purchase Resume */}
          <div className="flex flex-col w-full md:w-1/3 h-full gap-4 p-4 md:sticky md:top-14">
            <p className="text-blue-900 text-xl font-extrabold">
              Purchase Resume
            </p>
            <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">
                  Subtotal ({products.length} Items)
                </p>
                <p className="text-end font-bold">$99.98</p>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Freight</p>
                <div>
                  <p className="text-end font-bold">$3.90</p>
                  <p className="text-gray-600 text-sm font-normal">
                    Arrives on Jul 16
                  </p>
                </div>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Discount Coupon</p>
                <a className="text-gray-500 text-base underline" href="#">
                  Add
                </a>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Total</p>
                <div>
                  <p className="text-end font-bold">$103.88</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                  FINISH
                </button>
                <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                  ADD MORE PRODUCTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;

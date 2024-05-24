import React, { useEffect, useState } from "react";


//   {
//     id: 1,
//     name: "Product 1",
//     description:
//       "Nulla id ornare quam. Nullam nec ultrices justo. Sed accumsan velit a magna tempor dignissim.",
//     image: "product1.jpg", // Replace 'product1.jpg' with the actual image file name and path
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     description:
//       "Nulla id ornare quam. Nullam nec ultrices justo. Sed accumsan velit a magna tempor dignissim.",
//     image: "product2.jpg", // Replace 'product2.jpg' with the actual image file name and path
//   },
//   {
//     id: 3,
//     name: "Product 2",
//     description:
//       "Nulla id ornare quam. Nullam nec ultrices justo. Sed accumsan velit a magna tempor dignissim.",
//     image: "product2.jpg", // Replace 'product2.jpg' with the actual image file name and path
//   },
//   {
//     id: 4,
//     name: "Product 2",
//     description:
//       "Nulla id ornare quam. Nullam nec ultrices justo. Sed accumsan velit a magna tempor dignissim.",
//     image: "product2.jpg", // Replace 'product2.jpg' with the actual image file name and path
//   },
//   {
//     id: 5,
//     name: "Product 2",
//     description:
//       "Nulla id ornare quam. Nullam nec ultrices justo. Sed accumsan velit a magna tempor dignissim.",
//     image: "product2.jpg", // Replace 'product2.jpg' with the actual image file name and path
//   },
//   {
//     id: 6,
//     name: "Product 2",
//     description:
//       "Nulla id ornare quam. Nullam nec ultrices justo. Sed accumsan velit a magna tempor dignissim.",
//     image: "product2.jpg", // Replace 'product2.jpg' with the actual image file name and path
//   },
//   // Add more products as needed
// ];
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
    color: "bg-purple-500",
    name: "Purple",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
  },
  {
    color: "bg-pink-500",
    name: "Pink",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
  },
  {
    color: "bg-indigo-500",
    name: "Indigo",
    image: "https://rukminim1.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100",
  },
  {
    color: "bg-gray-500",
    name: "Gray",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
  },

];

const products = [
  {
    id: 1,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpHnLmFg3mWl6Kj-Oqql3w922HQyrn8DfgA&s',
    price: 99.00,
    salePrice: 179.00,
    sale: true,
    name: 'Fresh iphones',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpHnLmFg3mWl6Kj-Oqql3w922HQyrn8DfgA&s',
    price: 99.00,
    salePrice: 79.00,
    sale: true,
    name: 'Fresh Iphones',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpHnLmFg3mWl6Kj-Oqql3w922HQyrn8DfgA&s',
    price: 99.00,
    salePrice: 79.00,
    sale: false,
    name: 'Fresh Iphones',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpHnLmFg3mWl6Kj-Oqql3w922HQyrn8DfgA&s',
    price: 99.00,
    salePrice: 79.00,
    sale: true,
    name: 'Fresh Iphones',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },

  {
    id: 5,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVncOQXpeMzcP-zGmqcByGSBu9b1RMZCIg5A&s',
    price: 99.00,
    salePrice: 79.00,
    sale: true,
    name: 'Fresh Android',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 6,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVncOQXpeMzcP-zGmqcByGSBu9b1RMZCIg5A&s',
    price: 99.00,
    salePrice: 79.00,
    sale: true,
    name: 'Fresh Android',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 7,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVncOQXpeMzcP-zGmqcByGSBu9b1RMZCIg5A&s',
    price: 99.00,
    salePrice: 79.00,
    sale: false,
    name: 'Fresh Android',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 8,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVncOQXpeMzcP-zGmqcByGSBu9b1RMZCIg5A&s',
    price: 99.00,
    salePrice: 79.00,
    sale: false,
    name: 'Fresh Android',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },



];
const images = [
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/30c93ff8cf3026dd.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  { url: 'https://rukminim1.flixcart.com/fk-p-flap/520/280/image/8eacc329e456d1e2.jpg?q=20' },
  // Add more image objects as needed
];

const Home = () => {


  return (
    <>
      <div>
        <h2 className="text-center text-xl lg:text-2xl font-bold mb-4">Featured Categories</h2>
        <div className="bg-slate-50 lg:h-32 flex items-center lg:mx-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-4 lg:grid-cols-8 md:grid-cols-4 sm:grid-cols- gap-4">
              {circles.map((circle, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full cursor-pointer `}>

                    {/*${circle.color}*/}
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



      {/* <div className="md:flex md:justify-evenly gap-6 container mx-auto mt-4">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <div className="h-60 bg-gray-300 rounded-lg md:rounded-none px-4"></div>
        </div>
        <div className="md:w-1/3 mb-4 md:mb-0">
          <div className="h-60 bg-gray-300 rounded-lg md:rounded-none px-4"></div>
        </div>
        <div className="md:w-1/3">
          <div className="h-60 bg-gray-300 rounded-lg md:rounded-none px-4"></div>
        </div>
      </div> */}



      {/* 
      <div className="p-4">
        <div className="flex flex-row overflow-x-auto overflow-y-hidden sm:overflow-y-auto relative">
    
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-60 bg-white mr-4 border border-gray-200 rounded-lg p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                  View
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}


      <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
        <div className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Fresh Iphones and Android</h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {products.map(product => (
              <article key={product.id} className="relative flex flex-col overflow-hidden rounded-lg border">
                <div className="group aspect-square overflow-hidden">
                  <img className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105" src={product.imageUrl} alt={product.name} />
                </div>
                {product.sale && <div className="absolute top-0 m-2 rounded-full bg-white">
                  <p className="rounded-full bg-indigo-600 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
                </div>}
                <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                  <div className="mb-2 flex">
                    <p className="mr-3 text-sm font-semibold">${product.price}</p>
                    {product.sale && <del className="text-xs text-gray-400">${product.salePrice}</del>}
                  </div>
                  <h3 className="mb-2 text-sm text-gray-400">{product.name}</h3>
                  <p className="text-xs text-gray-400">{product.description}</p>
                </div>
                <button className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                  <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-indigo-700 group-hover:text-white">Add</div>
                  <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-indigo-600 group-hover:text-white">+</div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {images.map((image, index) => (
          <div key={index} className="group cursor-pointer relative">
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className="w-full h-50 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                View
              </button>
            </div>
          </div>
        ))}
      </div>


<div className="">
  

  <div className="h-full  bg-zinc-500 ">
    <div className="flex justify-between mx-4">

    <p className="text-white mx-4">Latest Summer Sale</p>
    <i className="ri-arrow-right-line"></i>
    </div>
    
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 gap-4 px-4 py-4">
      <div className="border rounded-lg overflow-hidden">
        <img src="image1.jpg" alt="Product 1" className="w-full h-auto" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">Product 1</h3>
          <p>Description of Product 1</p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <img src="image2.jpg" alt="Product 2" className="w-full h-auto" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">Product 2</h3>
          <p>Description of Product 2</p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <img src="image3.jpg" alt="Product 3" className="w-full h-auto" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">Product 3</h3>
          <p>Description of Product 3</p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <img src="image4.jpg" alt="Product 4" className="w-full h-auto" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">Product 4</h3>
          <p>Description of Product 4</p>
        </div>
      </div>
    </div>
  </div>
  <div>
    img
  </div>
</div>


    </>
  );
};

export default Home;

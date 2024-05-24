import React from 'react';
import Layout from '../../layout/Layout';

const Categories = () => {
  const categoryData = [
    {
      image: 'https://m.media-amazon.com/images/I/61P4ZBngpHL._AC_UL480_FMwebp_QL65_.jpg',
      discount: '20% off',
      description: 'Sports Shoes',
    },
    {
      image: 'https://m.media-amazon.com/images/I/51j2mBT8iiL._AC_UL480_FMwebp_QL65_.jpg',
      discount: '15% off',
      description: 'Casual Shirts',
    },
    {
      image: 'https://m.media-amazon.com/images/I/416PYMNMBQL._AC_UL480_FMwebp_QL65_.jpg',
      discount: '25% off',
      description: 'Sunglasses',
    },
    {
      image: 'https://rukminim2.flixcart.com/image/612/612/kerfl3k0pkrrdj/watch/v/s/x/2038-wh-fogg-original-imafvhvvpct6qmxb.jpeg?q=70',
      discount: '35% off',
      description: 'Category 3 Description',
    },
    {
      image: 'https://m.media-amazon.com/images/I/31XK-yAsqoL._AC_UL480_FMwebp_QL65_.jpg',
      discount: '45% off',
      description: 'Formal Pants',
    },
    {
      image: 'https://m.media-amazon.com/images/I/61dPnTeEaZL._AC_UL480_FMwebp_QL65_.jpg',
      discount: '35% off',
      description: 'Perfumes',
    },
  ];

  return (
    <Layout >

<h2 className="text-center text-xl lg:text-2xl font-bold mb-10 pt-24">
          Shop for Men's
        </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4  mx-auto container">
      {categoryData.map((category, index) => (
        <div key={index} className=" rounded-lg shadow-md overflow-hidden">
          <a href="#" className="block">
            <img src={category.image} alt="Category" className="w-full h-48 object-contain transition-transform duration-300 hover:scale-125" />
          </a>
          <div className="p-4 ">
            <div className="text-gray-800 font-semibold mb-2 flex justify-center">{category.discount}</div>
            <p className="text-gray-600 flex justify-center">{category.description}</p>
          </div>
        </div>
      ))}
    </div>
    </Layout>
  );
};

export default Categories;

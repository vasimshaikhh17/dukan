import React, { useState } from 'react';
import Layout from '../layout/Layout';

const Details = () => {
  const product = {
    name: 'Sample Product',
    price: '$99.99',
    description: 'This is a sample product description.',
    images: [
      'https://m.media-amazon.com/images/I/71GMyeIiaNL._SY741_.jpg',
      'https://m.media-amazon.com/images/I/71RYNK1iGPL._SY741_.jpg',
      'https://m.media-amazon.com/images/I/71sTv352CGL._SY741_.jpg',
     'https://m.media-amazon.com/images/I/71SN6Ri2iLL._SY741_.jpg ',
      'https://m.media-amazon.com/images/I/71oZba+s3BL._SY741_.jpg'
    ],
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4'
    ],
    details: {
      'Material composition': 'Cotton',
      'Pattern': 'Tie Dye',
      'Fit type': 'Loose Fit',
      'Sleeve type': 'Half Sleeve',
      'Collar style': 'Collarless',
      'Length': 'Long Length',
      'Country of Origin': 'India'
    },
    about: [
      'Care Instructions: Hand Wash Only; Fit Type: Loose Fit',
      'Sleeve type: Half sleeve with stylish casual oversize design for Women',
      'Design and style: Trending Color combination all over printed design with gives extra ordinary casual look',
      'Pairing: This t-shirt is easy to be paired with your Jeans, skinny leggings, jeggings and shorts, etc.',
      'Please refer size chart before buying for perfect fitting.'
    ],
    additional: {
      'Manufacturer': 'Rohan Creation, Rohan Creation, Ahmedabad',
      'Packer': 'Rohan Creation, Ahmedabad',
      'Item Weight': '200 g',
      'Item Dimensions LxWxH': '27 x 25 x 2.5 Centimeters',
      'Net Quantity': '1.00 count',
      'Generic Name': 'T-Shirt'
    }
  };

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col space-y-2 mb-4 md:mb-0 md:mr-4">
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
            <div className="flex-1">
              <img src={mainImage} alt="Product" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-green-500 mb-4">{product.price}</p>
            <p className="mb-4">{product.description}</p>
            <label className="mb-2 font-bold">Select Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mb-4 p-2 border rounded-lg"
            >
              <option value="" disabled>Select size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <ul className="list-disc list-inside mb-4">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Product Details</h2>
          <ul className="list-disc list-inside mb-4">
            {Object.entries(product.details).map(([key, value], index) => (
              <li key={index}><span className="font-bold">{key}:</span> {value}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mb-4">About this item</h2>
          <ul className="list-disc list-inside mb-4">
            {product.about.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mb-4">Additional Information</h2>
          <ul className="list-disc list-inside">
            {Object.entries(product.additional).map(([key, value], index) => (
              <li key={index}><span className="font-bold">{key}:</span> {value}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Details;

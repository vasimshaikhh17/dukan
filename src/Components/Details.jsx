import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useParams } from "react-router-dom";
import Loaders from '../common/loaders/Loaders';
const Details = () => {
  
  
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [msg,setMsg] = useState("")
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setMsg(<Loaders/>)
      try {
        const response = await axios.get(`http://localhost:5000/api/product/get/${params.id}`);
        setProduct(response.data);
        setMainImage(response.data.images[0]);
        setMsg("")
      } catch (error) {
        setMsg("Something Went Wrong")
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return (<Layout>


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
              <img src={mainImage} alt="Product" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0 md:order-1 mr-3">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product thumbnail ${index}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer transform hover:scale-110 transition-transform duration-200 "
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl text-green-500 mb-4">₹{product.price}</p>
            <p className="mb-4">{product.description}</p>
            <label className="mb-2 font-bold">Select Size:</label>
            <div className="flex space-x-2 mb-4">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-2 border rounded-lg ${selectedSize === size ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;

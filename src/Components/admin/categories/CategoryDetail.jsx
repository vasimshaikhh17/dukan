import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layout/AdminLayout';
import { useLocation } from 'react-router-dom';

const CategoryDetail = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const location = useLocation()
  const [category,setCategory] = useState(location?.state);
  
  const [categoryList , setCategoryList] = useState([])
  // console.log(location.state,'state')
  // console.log(category,'category')



  useEffect(() => {
    fetchProducts();
    fetchProductsCatList()
  }, []);

  useEffect(()=>{
    fetchProducts();
  },[category,selectedSubCategory])

  const fetchProducts = async () => {
    try {
      let url = `http://localhost:5000/api/product/getAll/?category=${category}`;
      if (selectedSubCategory) {
        url += `&subCategory=${selectedSubCategory}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductsCatList = async () => {
    try {
      let url = `http://localhost:5000/api/product/getAll/?category=${category}`;

      const response = await axios.get(url);
      console.log(response,'jsndjsndjsbdkaybdhjn')
      setCategoryList(response.data);
      // const uniqueCategories = [...new Set(response.data.map(product => product.category))];
      // console.log(response,'respsjndjsnd')
      // setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/category/getAll`);
        // console.log(response,'resp')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);




  return (
    <AdminLayout>
      
      <div className="p-4 sm:ml-64">
        <div className="p-4  mt-14">
          <h1 className="text-2xl font-bold mb-4">Product Details</h1>


          <div className='md:flex gap-10 '>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)} 
              className="mt-1 p-2 w-fit border rounded-lg"
            >
              <option  value="">All Categories</option>
              {categories.map((category, index) => (
                <option  key={index} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SubCategory</label>
            <select
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="mt-1 p-2 w-fit border rounded-lg"
            >
              <option value="">All SubCategories</option>
              {categoryList?.map((el, index) => (
                <option key={index} value={el.subCategory}>
                  {el.subCategory}
                </option>
              ))}
            </select>
          </div>
          </div>

          <div className="hidden md:block">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="text-start  border-b">Image</th>
                  <th className="text-start py-2 px-4 border-b">Title</th>
                  {/* <th className="py-2 px-4 border-b">Description</th> */}
                  <th className="text-start py-2 px-4 border-b">Price</th>
                  <th className="text-start py-2 px-4 border-b">Category</th>
                  <th className="text-start py-2 px-4 border-b">SubCategory</th>
                  <th className="text-start py-2 px-4 border-b">Brand</th>
                  <th className="text-start py-2 px-4 border-b">Color</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={product.images[0] || "placeholder-image-url.jpg"}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{product.title}</td>
                    <td className="py-2 px-4 border-b">{product.price}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.subCategory}</td>
                    <td className="py-2 px-4 border-b">{product.brand}</td>
                    <td className="py-2 px-4 border-b">{product.color}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="block md:hidden space-y-4">
          {products.map((product) => (
              <div key={product._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <img
                  src={product.images[0] || "placeholder-image-url.jpg"}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{product.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2"><strong>Price:</strong> {product.price}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2"><strong>Category:</strong> {product.category}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2"><strong>SubCategory:</strong> {product.subCategory}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2"><strong>Brand:</strong> {product.brand}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2"><strong>Color:</strong> {product.color}</p>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryDetail;

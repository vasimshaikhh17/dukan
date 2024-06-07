import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryDetail = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const location = useLocation();
  const [category, setCategory] = useState(location?.state?.category || "");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category, selectedSubCategory]);

  const fetchProducts = async () => {
    try {
      let url = `http://localhost:5000/api/product/getAll/?category=${category}`;
      if (selectedSubCategory) {
        url += `&sub_category=${selectedSubCategory}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
      console.log(response,"mihirchomu");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/category/getAll`
      );
      setCategories(response.data);
      // console.log(response,"cool");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/category/subcategories`
      );
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <h1 className="text-2xl font-bold mb-4">Product Details</h1>

          <div className="md:flex gap-40">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 p-2 w-fit border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <div className="flex gap-5 mt-3 mb-3">
                <button onClick={() => navigate(`/admin/add-category`)} className="bg-green-700 text-white p-2 rounded-lg">
                  Create
                </button>
                <button onClick={() => navigate(`/admin/update-category`)} className="bg-blue-700 text-white p-2 rounded-lg">
                  Update
                </button>
                <button onClick={() => navigate(`/admin/delete-category`)} className="bg-red-700 text-white p-2 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SubCategory
              </label>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="mt-1 p-2 w-fit border rounded-lg"
              >
                <option value="">All Sub Category</option>
                {subCategories.map((sub_category, index) => (
                  <option key={index} value={sub_category.category}>
                    {sub_category.category}
                  </option>
                ))}
              </select>
              <div className="flex gap-5 mt-3 mb-3">
                <button onClick={() => navigate(`/admin/create-sub_category`)} className="bg-green-700 text-white p-2 rounded-lg">
                  Create
                </button>
                <button onClick={() => navigate(`/admin/update-sub_category`)} className="bg-blue-700 text-white p-2 rounded-lg">
                  Update
                </button>
                <button onClick={() => navigate(`/admin/delete-sub_category`)} className="bg-red-700 text-white p-2 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="text-start border-b">Image</th>
                  <th className="text-start py-2 px-4 border-b">Title</th>
                  <th className="text-start py-2 px-4 border-b">Price</th>
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
                    <td className="py-2 px-4 border-b">{product.sub_category}</td>
                    <td className="py-2 px-4 border-b">{product.brand}</td>
                    <td className="py-2 px-4 border-b">{product.color}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <img
                  src={product.images[0] || "placeholder-image-url.jpg"}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  <strong>Price:</strong> {product.price}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  <strong>SubCategory:</strong> {product.sub_category}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  <strong>Color:</strong> {product.color}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryDetail;

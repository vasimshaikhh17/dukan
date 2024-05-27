import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";

const CreateProduct = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchSubcategories = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get("http://localhost:5000/api/category/subcategories");
      setSubcategories(res.data);
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  const fetchCategories = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get("http://localhost:5000/api/category/getAll");
      setCategories(res.data);
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-11">
          <h1 className="text-3xl font-bold text-center mb-2">Create New Product</h1>

          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <form action="#" method="POST" encType="multipart/form-data">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title of product"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter description of product"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-gray-700 font-medium">
                  Color:
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter color of product"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-medium">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter price of product"
                />
              </div>
              <div className="flex justify-between">

              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-medium">
                  Category:
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="subCategory" className="block text-gray-700 font-medium">
                  Sub Category:
                </label>
                <select
                  id="subCategory"
                  name="subCategory"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Sub Category</option>
                  {subcategories.map((subCat) => (
                    <option value={subCat._id} key={subCat._id}>
                      {subCat.category}
                    </option>
                  ))}
                </select>
              </div>
              </div>
              <div className="mb-4">
                <label htmlFor="brand" className="block text-gray-700 font-medium">
                  Brand:
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-medium">
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
          {msg && <div className="mt-4 text-center">{msg}</div>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;

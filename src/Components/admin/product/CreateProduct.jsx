import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";

const CreateProduct = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [newBrand, setNewBrand] = useState([]);
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    color: "",
    price: "",
    category: "",
    sub_category: "",
    brand: "",
    tags: "",
    sold: "0",
    quantity: [
      { size: "S", quantity: 0 , price: 0},
      { size: "M", quantity: 0 , price: 0},
      { size: "L", quantity: 0 , price: 0},
      { size: "XL", quantity: 0 , price: 0},
      { size: "XXL", quantity: 0 , price: 0},
      { size: "XXXL", quantity: 0 , price: 0},

    ],
  });
  const [imageFiles, setImageFiles] = useState([]);

  const fetchBrand = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/brand/getAll`
      );
      setNewBrand(response.data);
      console.log(response.data, "sub branddss");

      setMsg("");
    } catch (error) {
      console.error("Error brand fetch:", error);
    }
  };

  const fetchSubcategories = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/subcategories"
      );
      setSubcategories(res.data);
      console.log(res.data , "subcategories");
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
    fetchBrand();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleQuantityChange = (index, field, value) => {
    const newQuantities = productData.quantity.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setProductData({ ...productData, quantity: newQuantities });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length <= 10) {
      setImageFiles(files);
    } else {
      console.log("You can upload a maximum of 10 images");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(<Spinner />);

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === "quantity") {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/product/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsg(res.data.message || "Product created successfully");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  return (
    <AdminLayout>
      <div className="p-1 ">
        <div className="p-4 border-2 border-dashed rounded-lg ">
          <h1 className="text-3xl font-bold text-center ">
            Create New Product
          </h1>
          {msg && <div className="mt-4 text-center">{msg}</div>}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4 w-full mx-auto p-6 rounded-lg shadow-lg"
          >
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={productData?.title}
                onChange={handleInputChange}
                placeholder="Enter title of product"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productData?.description}
                onChange={handleInputChange}
                placeholder="Enter description of product"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="color"
                >
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={productData?.color}
                  onChange={handleInputChange}
                  placeholder="Enter color of product"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productData?.price}
                  onChange={handleInputChange}
                  placeholder="Enter price of product"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="brand"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={productData?.brand}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {newBrand?.map((brandy) => (
                    <option value={brandy._id} key={brandy._id}>
                      {brandy.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="tags"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={productData?.tags}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={productData?.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="sub_category"
                >
                  Sub Category
                </label>
                <select
                  id="sub_category"
                  name="sub_category"
                  value={productData?.sub_category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="">Select Sub Category</option>
                  {subcategories.map((subCat) => (
                    <option value={subCat._id} key={subCat._id}>
                      {subCat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="sold"
                >
                  Sold
                </label>
                <input
                  type="number"
                  id="sold"
                  name="sold"
                  value={productData?.sold}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {productData.quantity.map((q, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <input
                      type="text"
                      name={`size-${index}`}
                      value={q.size}
                      onChange={(e) =>
                        handleQuantityChange(index, "size", e.target.value)
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      readOnly
                    />
                    <input
                      type="number"
                      name={`quantity-${index}`}
                      value={q.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, "quantity", e.target.value)
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price for {q.size}
                    </label>
                     <input
                      type="number"
                      name={`price-${index}`}
                      value={q.price}
                      onChange={(e) =>
                        handleQuantityChange(index, "price", e.target.value)
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Submit
            </button>
          </form>
        </div>
  
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;

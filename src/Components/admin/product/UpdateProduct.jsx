import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";

const UpdateProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newBrand, setNewBrand] = useState([]);

  const [catName, setCatName] = useState("");
  const [subcatName, setSubCatName] = useState("");
  const [brandName, setBrandName] = useState("");

  const [msg, setMsg] = useState();
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    color: "",
    category: "",
    sub_category: "",
    price: "",
    brand: "",
    quantity: [{ size: "", quantity: "" }],
    images: [],
  });
  const bearerToken = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/get/${id}`
        );
        setUpdateData(response.data);
        console.log(response.data, "updated data");
        // setBrandName(response.data);
        // console.log(response.data.brand , "brandy")
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error, "djmnjnmwjd");
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleQuantityChange = (index, name, value) => {
    const updatedQuantities = [...updateData.quantity];
    updatedQuantities[index][name] = value;
    setUpdateData({ ...updateData, quantity: updatedQuantities });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/updateProduct/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        toast.success("Product Updated Successfully");
        navigate("/admin/allproducts");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchCategories = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(`http://localhost:5000/api/category/getAll`);
      setCategories(res.data);
      if (res.data) {
        const cat = res.data.filter(
          (item) => item._id === updateData?.category
        );

        if (cat.length > 0) {
          setCatName(cat[0].title);
          console.log(cat[0].title, "cool");
        }
        console.log(cat, "cat");
      }
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/category/subcategories`
      );
      setSubCategories(response.data);
      console.log(response.data, "sub");

      if (response.data) {
        const subcat = response.data.filter(
          (item) => item._id === updateData?.sub_category
        );

        if (subcat.length > 0) {
          setSubCatName(subcat[0].sub_category);
          console.log(subcat[0].sub_category, "cossol");
        }
      }
      setMsg("");
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

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

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchBrand();
  }, [updateData]);

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Product
        </h2>
        <form onSubmit={updateProduct}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={updateData.title}
                onChange={handleUpdateInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={updateData.description}
                onChange={handleUpdateInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Color</label>
              <input
                type="text"
                name="color"
                value={updateData.color}
                onChange={handleUpdateInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={updateData.category}
                onChange={handleUpdateInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">
                  {updateData?.category?.title
                    ? updateData?.category?.title
                    : "No Category Selected"}
                </option>
                {categories

                  .filter(
                    (category) => category.title !== updateData.category.title
                  ) // Filter out the selected category
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Sub Category</label>
              <select
                name="sub_category"
                value={updateData.sub_category}
                onChange={handleUpdateInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">
                  {updateData?.sub_category?.title
                    ? updateData?.sub_category?.title
                    : "No Category Selected"}
                </option>
                {subCategories
                  .filter(
                    (subCategory) =>
                      subCategory.title !== updateData.sub_category.title
                  ) // Filter out the selected category
                  .map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={updateData.price}
                onChange={handleUpdateInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Brand</label>
              <select
                name="brand"
                value={updateData.brand}
                onChange={handleUpdateInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">
                  {updateData?.brand?.name
                    ? updateData?.brand?.name
                    : "No Brand Selected"}
                </option>
                {newBrand
                  .filter((brandy) => brandy?.name !== updateData?.brand?.name) // Filter out the selected category

                  .map((brandy) => (
                    <option key={brandy._id} value={brandy._id}>
                      {brandy.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {updateData.quantity.map((q, index) => (
                <div key={index} className="flex flex-col items-start">
                  <input
                    type="text"
                    name={`size-${index}`}
                    value={q.size}
                    onChange={(e) =>
                      handleQuantityChange(index, "size", e.target.value)
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <div className="flex flex-wrap gap-4">
              {updateData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={() => navigate("/admin/allproducts")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;

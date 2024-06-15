import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout.jsx";
import axios from "axios";
import Spinner from "../others/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState();
  const [prodDelete, setProductDelete] = useState(null);
  const [prodUpdate, setProductUpdate] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    color: "",
    brand: "",
    sub_category: "",
    price: "",
  });
  const navigate = useNavigate();
  const bearerToken = JSON.parse(localStorage.getItem("userData"));

  const bringProducts = async () => {
    try {
      setMsg(<Spinner />);
      const response = await axios.get(
        "http://localhost:5000/api/product/getAll"
      );
      setProducts(response.data);
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  useEffect(() => {
    bringProducts();
  }, []);

  const deleteProduct = async (id) => {
    setMsg(<Spinner />);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/deleteProduct/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        toast.success("Product Deleted Successfully");
        setMsg("");
        bringProducts();
        setProductDelete(null);
      }
    } catch (error) {
      setMsg("");
      toast.error("Something went Wrong");
    }
  };

  const setTopProduct = async (id) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
  
    try {
      const Response = await axios.put(
        `http://localhost:5000/api/topProduct/top-products` ,
        { prodId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      toast.success("Product added to top product");

      console.log(Response, "topproduct");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add top product");
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const updateProduct = async (id) => {
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
        bringProducts();
        setProductUpdate(null);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };


  
  return (
    <AdminLayout>
      {!msg ? (
        <div className="p-4 ">
          <div className=" border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">All Products</h1>
              <button
                onClick={() => navigate(`/admin/create-product`)}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
              >
                Create New Product
              </button>
            </div>
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-4 text-start">Image</th>
                    <th className="py-3 px-4 text-start">Title</th>
                    <th className="py-3 px-4 text-start">Color</th>
                    <th className="py-3 px-4 text-start">Brand</th>
                    <th className="py-3 px-4 text-start">Sub Category</th>
                    <th className="py-3 px-4 text-start">Price</th>
                    <th className="py-3 px-4 text-start">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="py-3 px-4">
                        <img
                          src={product.images[0] || "/placeholder.png"}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>

                      <td className="py-3 px-4">{product.title}</td>
                      <td className="py-3 px-4">{product.color}</td>
                      <td className="py-3 px-4">{product.brand}</td>
                      <td className="py-3 px-4">{product.sub_category}</td>
                      <td className="py-3 px-4">₹{product.price}</td>
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          onClick={()=> navigate(`/admin/update-product/${product._id}`)
                          }
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setProductDelete(product._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          onClick={() => setTopProduct(product._id)}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden mt-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg p-4 mb-4"
                >
                  <img
                    src={product.images[0] || "/placeholder.png"}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <p className="text-xl font-bold">{product.color}</p>
                  <p className="text-gray-700">{product.brand}</p>
                  <p className="text-gray-700">${product.price}</p>
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => {
                        setProductUpdate(product._id);
                        setUpdateData({
                          title: product.title,
                          color: product.color,
                          brand: product.brand,
                          sub_category: product.sub_category,
                          price: product.price,
                        });
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setProductDelete(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <div>
                      <button
                        onClick={() => setTopProduct(product._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4 h-60 flex items-center justify-center">
          {msg}
        </div>
      )}

      {prodDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to delete this Product?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  deleteProduct(prodDelete);
                }}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setProductDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {prodUpdate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Update Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(prodUpdate);
              }}
            >
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
                <label className="block text-gray-700">Color</label>
                <input
                  type="text"
                  name="color"
                  value={updateData.color}
                  onChange={handleUpdateInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={updateData.brand}
                  onChange={handleUpdateInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sub Category</label>
                <input
                  type="text"
                  name="sub_category"
                  value={updateData.sub_category}
                  onChange={handleUpdateInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
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
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  onClick={() => setProductUpdate(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AllProducts;

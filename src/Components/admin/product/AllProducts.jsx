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
      console.log(response.data , "bring product ")
    } catch (error) {
 
      console.log("error in all product", error);
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
    } catch (error) {
      toast.error("Unable to add top product");
    }
  };



   const [search,setSearch] = useState("");

   const searchedData = products.filter((currProduct)=> currProduct.title.toLowerCase().includes(search.toLocaleLowerCase()))
  return (
    <AdminLayout>


      <input type="text"   placeholder="search heres" value={search}  onChange={(e)=>setSearch(e.target.value)}/>
    <div className="container mx-auto px-4 py-8">

    
      {!msg ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">All Products</h1>
            <button
              onClick={() => navigate('/admin/create-product')}
              className="w-full sm:w-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Create New Product
            </button>
          </div>
          
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {['Image', 'Name', 'Category', 'Sub Category', 'Color', 'Brand', 'Price', 'Actions'].map((header) => (
                    <th key={header} className="p-3 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {searchedData.map((product) => (
                  <tr key={product?._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={product?.images[0] || "/api/placeholder/100/100"}
                        alt={product?.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">{product?.title.toUpperCase()}</td>
                    <td className="p-3">{product?.category?.title}</td>
                    <td className="p-3">{product?.sub_category?.title}</td>
                    <td className="p-3">{product?.color}</td>
                    <td className="p-3">{product?.brand?.name || "Non Branded"}</td>
                    <td className="p-3">₹{product?.price}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/update-product/${product?._id}`)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300 ease-in-out"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setProductDelete(product?._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setTopProduct(product?._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 ease-in-out"
                        >
                          Add
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="lg:hidden space-y-6 mt-6">
            {searchedData.map((product) => (
              <div key={product?._id} className="bg-white shadow rounded-lg p-4">
                <img
                  src={product?.images[0] || "/api/placeholder/300/200"}
                  alt={product?.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{product?.title.toUpperCase()}</h2>
                <p className="text-gray-600 mb-1">Category: {product?.category?.title}</p>
                <p className="text-gray-600 mb-1">Sub Category: {product?.sub_category?.title}</p>
                <p className="text-gray-600 mb-1">Color: {product?.color}</p>
                <p className="text-gray-600 mb-1">Brand: {product?.brand?.name || "Non Branded"}</p>
                <p className="text-gray-800 font-semibold mb-4">Price: ₹{product?.price}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/admin/update-product/${product?._id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setProductDelete(product?._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setTopProduct(product?._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700">{msg}</div>
      )}

      {prodDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to delete this Product?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={() => deleteProduct(prodDelete)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300 ease-in-out"
                onClick={() => setProductDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AllProducts;

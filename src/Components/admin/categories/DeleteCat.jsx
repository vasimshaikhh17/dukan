import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DeleteCat = () => {
  const [cat, setCat] = useState([]);
  const [msg, setMsg] = useState();
  const [catDelete, setCatDelete] = useState(null);
  const navigate = useNavigate();
  const bearerToken = JSON.parse(localStorage.getItem("userData"));

  const getAllCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(`http://localhost:5000/api/category/getAll`);

      setCat(res.data);
      // const data = res.data;
      // console.log(data);
      setMsg("");
    } catch (error) {
      // console.log(error);
      setMsg("Spmething Went Wrong");
    }
  };
  useEffect(() => {
    getAllCat();
  }, []);

  const deleteCat = async (id) => {
    setMsg(<Spinner />);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/category/deleteCategory/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      if (response.data) {
        // toast.success("Product Deleted Successfully");
        setMsg("");
        getAllCat();
        setCatDelete(null);
      }
    } catch (error) {
      setMsg("");
      // toast.error("Something went Wrong");
    }
  };

  return (
    <AdminLayout>
      {!msg ? (
        <div className="p-1">
          <div className="p-1 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-2">
            <h1 className="text-2xl font-bold text-center mb-5">
              Delete a Category
            </h1>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-start">Image</th>
                    <th className="px-4 py-2 text-start">Category</th>
                    <th className="px-4 py-2 text-start">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.map((category) => (
                    <tr key={category._id} className="border-t">
                      <td className="px-4 py-2">
                        <img
                          src={category.imageUrl}
                          alt=""
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2">{category.title}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => setCatDelete(category._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="ri-delete-bin-6-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4 h-60 flex items-center justify-center">
          {msg}
        </div>
      )}

      {catDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to delete this Category?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  deleteCat(catDelete);
                }}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setCatDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/*  */}
    </AdminLayout>
  );
};

export default DeleteCat;

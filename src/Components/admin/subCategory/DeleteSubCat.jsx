import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";

const DeleteSubCat = () => {
  const [subCat, setSubCat] = useState([]);
  const [msg, setMsg] = useState();
  const [deleteId, setDeleteId] = useState(null);

  const getAllSubCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/subcategories"
      );
      setSubCat(res.data);
      console.log(res.data , "ccc")
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  const deleteSubCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/category/subcategory/${id}`);
      setSubCat(subCat.filter((subcat) => subcat._id !== id));
      setDeleteId(null);
      setMsg("Subcategory deleted successfully");
      setTimeout(() => setMsg(""), 1000);
    } catch (error) {
      setMsg("Failed to delete subcategory");
    }
  };

  useEffect(() => {
    getAllSubCat();
  }, []);

  return (
    <AdminLayout>
      {!msg ? (
        <div className="p-2 ">
          <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
            <h1 className="text-xl font-semibold mb-4">Delete Subcategory</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-start">Images</th>
                    <th className="px-4 py-2 text-start">Category</th>
                    <th className="px-4 py-2 text-start">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCat.map((subcat) => (
                    <tr key={subcat._id} className="border-t">
                      <td className="px-4 py-2"><img width={50} src={subcat?.image} alt="" /></td>
                      <td className="px-4 py-2">{subcat?.title}</td>
                 
                      <td className="px-4 py-2">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => setDeleteId(subcat._id)}
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

      {deleteId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to delete this subcategory?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => deleteSubCategory(deleteId)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DeleteSubCat;

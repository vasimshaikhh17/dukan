import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";
// import { FaEdit } from "react-icons/fa";

const UpdateSubCat = () => {
  const [subCat, setSubCat] = useState([]);
  const [msg, setMsg] = useState();
  const [editId, setEditId] = useState(null);
  const [editCategory, setEditCategory] = useState("");

  const getAllSubCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/subcategories"
      );
      setSubCat(res.data);
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  const updateSubCategory = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/category/subcategory/${id}`, {
        category: editCategory,
      });
      setSubCat(
        subCat.map((subcat) =>
          subcat._id === id ? { ...subcat, category: editCategory } : subcat
        )
      );
      setEditId(null);
      setMsg("Subcategory updated successfully");
      setTimeout(() => setMsg(""), 1000);
    } catch (error) {
      setMsg("Failed to update subcategory");
    }
  };

  useEffect(() => {
    getAllSubCat();
  }, []);

  return (
    <AdminLayout>
      {!msg ? (
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <h1 className="text-xl font-semibold mb-4">Update Subcategory</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-start">Category</th>
                    <th className="px-4 py-2 text-start">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCat.map((subcat) => (
                    <tr key={subcat._id} className="border-t">
                      <td className="px-4 py-2">{subcat.category}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            setEditId(subcat._id);
                            setEditCategory(subcat.category);
                          }}
                        >
                          Update
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

      {editId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Update Subcategory</h2>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updateSubCategory(editId)}
              >
                Update
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setEditId(null)}
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

export default UpdateSubCat;

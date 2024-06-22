import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";

const UpdateSubCat = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getAllSubcat = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/category/subcategories`);
      setSubCategories(res.data);
    } catch (error) {
      console.log(error, "cool");
    }
  };

  const updateSubCategory = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/category/subcategory/${id}`, {
        sub_category: updatedSubCategory,
      });

      setMessage("Sub-category updated successfully");
      getAllSubcat(); // Fetch updated data from the backend
    } catch (error) {
      console.log(error);
      setMessage("Failed to update sub-category");
    }
    clearMessageAfterDelay();
    setShowModal(false);
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleUpdateClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setUpdatedSubCategory(subCategory.sub_category);
    setShowModal(true);
  };

  useEffect(() => {
    getAllSubcat();
  }, []);

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <AdminLayout>
      <div className="p-2">
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-2">
          {message && <div className="mb-4 text-red-500">{message}</div>}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="w-1/2 px-4 py-2">Sub Category</th>
                  <th className="w-1/2 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((subCategory, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{subCategory.sub_category}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleUpdateClick(subCategory)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl mb-4">Update Sub-Category</h2>
            <input
              type="text"
              value={updatedSubCategory}
              onChange={(e) => setUpdatedSubCategory(e.target.value)}
              className="border px-4 py-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => updateSubCategory(selectedSubCategory._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UpdateSubCat;

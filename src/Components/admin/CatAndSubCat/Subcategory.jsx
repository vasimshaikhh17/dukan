import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";

const Subcategory = () => {
  // States for creating a new sub-category
  const [subCategory, setSubCategory] = useState({ title: "" });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  
  // States for deleting/updating sub-categories
  const [subCategories, setSubCategories] = useState([]);
  const [msg, setMsg] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch all sub-categories
  const getAllSubCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get("http://localhost:5000/api/category/subcategories");
      setSubCategories(res.data);
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  useEffect(() => {
    getAllSubCat();
  }, []);

  // Handle file input change for creating sub-category
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Handle input change for creating sub-category
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  // Check if sub-category exists and handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingSubCat = subCategories.find(
      (cat) => cat.title.toLowerCase() === subCategory.title.toLowerCase()
    );
    if (existingSubCat) {
      setMessage("Sub-category with this name already exists.");
      return;
    }
    setMessage(<Spinner />);

    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    const formData = new FormData();
    formData.append("title", subCategory.title);
    formData.append("images", imageFile);

    try {
      const res = await axios.post("http://localhost:5000/api/category/subcategory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${bearerToken.token}`,
        },
      });
      setMessage(res.data.message || "Sub-category created successfully");
      getAllSubCat(); // Refresh after creation
    } catch (error) {
      setMessage("Something went wrong: " + (error.response?.data?.message || error.message));
    }
  };

  // Handle delete sub-category
  const deleteSubCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/category/subcategory/${id}`);
      setSubCategories(subCategories.filter((subcat) => subcat._id !== id));
      setDeleteId(null);
      setMsg("Sub-category deleted successfully");
      getAllSubCat();
    } catch (error) {
      setMsg("Failed to delete sub-category");
    }
  };

  // Handle update sub-category
  const updateSubCategory = async (id) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    try {
      await axios.put(
        `http://localhost:5000/api/category/subcategory/${id}`,
        { title: updatedSubCategory },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      setMessage("Sub-category updated successfully");
    
      getAllSubCat(); // Refresh after update
    } catch (error) {
      setMessage("Failed to update sub-category");
    }
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add New Sub-category Card */}
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
          <h2 className="text-2xl mb-4">Add New Sub-category</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                value={subCategory?.title}
                onChange={handleInputChange}
                type="text"
                name="title"
                id="title"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Image
              </label>
              <input
                type="file"
                name="images"
                id="images"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md"
            >
              Add Sub-category
            </button>
          </form>
          {message && <div className="mt-4 text-red-600">{message}</div>}
        </div>

        {/* Delete/Update Sub-categories Card */}
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
          <h1 className="text-xl font-semibold mb-4">Manage Sub-categories</h1>
          {msg ? (
            <div className="bg-white shadow-lg rounded-lg p-4 h-60 flex items-center justify-center">{msg}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories.map((subcat) => (
                    <tr key={subcat._id} className="border-t">
                      <td className="px-4 py-2"><img width={50} src={subcat?.image} alt="" /></td>
                      <td className="px-4 py-2">{subcat?.title}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-4"
                          onClick={() => {
                            setSelectedSubCategory(subcat);
                            setUpdatedSubCategory(subcat.title);
                            setShowModal(true);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => setDeleteId(subcat._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for updating sub-category */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl mb-4">Update Sub-category</h2>
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

      {/* Notification for delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to delete this sub-category?
              </h2>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  deleteSubCategory(deleteId);
                  setDeleteId(null);
                }}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
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

export default Subcategory;


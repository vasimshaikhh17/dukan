import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      const response = await post("https://dukaan-ds92.onrender.com/api/category/create-category", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMsg("Category added successfully!");
      setTitle("");
      setImage(null);
    } catch (error) {
      setError("Error adding category: " + error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-center">Add New Category</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Category Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter category title"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                Category Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Category
            </button>
          </form>
          {msg && <p className="mt-4 text-green-500">{msg}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCategoryForm;

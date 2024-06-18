import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";

const AddNewCategory = () => {
  const [mainCat, setMainCat] = useState({
    categoryTitle: "", // Use the specific name used in Postman
  });

  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainCat({ ...mainCat, [name]: value });
  };

  const handleSubmit = async (e) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));

    e.preventDefault();
    setMsg(<Spinner />);

    const formData = new FormData();
    formData.append("title", mainCat.categoryTitle); // Use the specific name used in Postman
    formData.append("images", imageFile); // Use the specific name used in Postman

    try {
      const res = await axios.post(
        "http://localhost:5000/api/category/create-category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      setMsg(res.data.message || "Category created successfully");
    } catch (error) {
      console.error("Error creating category:", error.response?.data || error.message);
      setMsg("Something went wrong: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <AdminLayout>
      <div className="p-2">
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
          <h2 className="text-2xl mb-4">Add New Category</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="categoryTitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                value={mainCat?.categoryTitle}
                onChange={handleInputChange}
                type="text"
                name="categoryTitle" // Use the specific name used in Postman
                id="categoryTitle"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="categoryImage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Image
              </label>
              <input
                type="file"
                name="categoryImage" // Use the specific name used in Postman
                id="categoryImage"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Category
              </button>
            </div>
          </form>
          {msg && <div className="mt-4 text-red-600">{msg}</div>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddNewCategory;

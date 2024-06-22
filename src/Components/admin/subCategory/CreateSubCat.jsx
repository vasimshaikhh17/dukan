import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";

const CreateSubCat = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [message, setMessage] = useState("");

  const getAllSubcat = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/category/subcategories`);
      setSubCategories(res.data);
    } catch (error) {
      console.log(error, "cool");
    }
  };

  const createSubCategory = async () => {
    // Check if the sub-category already exists
    const exists = subCategories.some(
      (subCategory) => subCategory.sub_category.toLowerCase() === newSubCategory.toLowerCase()
    );

    if (exists) {
      setMessage("Sub-category already exists");
      clearMessageAfterDelay();
      return;
    }

    // If not, proceed to create a new sub-category
    try {
      const res = await axios.post(`http://localhost:5000/api/category/subcategory`, {
        sub_category: newSubCategory,
      });

      // Add the new sub-category to the state
      setSubCategories([...subCategories, res.data]);
      setMessage("Sub-category created successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to create sub-category");
    }

    clearMessageAfterDelay();

    // Clear the input field
    setNewSubCategory("");
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
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
          <div className="mb-4 flex flex-col sm:flex-row">
            <input
              type="text"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              placeholder="Enter sub-category name"
              className="border px-4 py-2 mb-2 sm:mb-0 sm:mr-2 flex-grow"
            />
            <button
              onClick={createSubCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Sub-Category
            </button>
          </div>
          {message && <div className="mb-4 text-red-500">{message}</div>}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="w-1/2 px-4 py-2">Sub Category</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((subCategory, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{subCategory.sub_category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateSubCat;

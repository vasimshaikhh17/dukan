import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";

const CreateSubCat = () => {
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [subCat, setSubCat] = useState([]);

  const getAllSubCat = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/subcategories"
      );
      setSubCat(res.data);
    } catch (error) {
      setMsg("Something went wrong while fetching subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSubCat();
  }, []);

  const handleCreate = async () => {
    if (subCat.some((subcat) => subcat.category.toLowerCase() === category.toLowerCase())) {
      setMsg("Category already exists");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      await axios.post("http://localhost:5000/api/category/subcategory", {
        category,
      });
      setMsg("Subcategory created successfully");
      setCategory("");
      getAllSubCat();
      setTimeout(() => setMsg(""), 1000);
    } catch (error) {
      setMsg("Failed to create subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-xl font-semibold mb-4">Create Subcategory</h1>
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-60">
                <Spinner />
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter New Sub Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={handleCreate}
                    disabled={!category}
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
            {msg && (
              <div className="mt-4 text-center text-gray-700">
                {msg}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-xl font-semibold mb-4">All Subcategories</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-start">Category</th>
                </tr>
              </thead>
              <tbody>
                {subCat.map((subcat) => (
                  <tr key={subcat._id} className="border-t">
                    <td className="px-4 py-2">{subcat.category}</td>
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

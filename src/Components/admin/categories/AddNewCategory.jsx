import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";

const AddNewCategory = () => {
  const [cat, setCat] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState(null);
  const [selectedSubCatId, setSelectedSubCatId] = useState(null); // Store the ID of the selected subcategory
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [mainCat, setMainCat] = useState({ categoryTitle: "" });
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [unassignedSubCat, setUnassignedSubCat] = useState([]);

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
    formData.append("title", mainCat.categoryTitle);
    formData.append("images", imageFile);

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
      console.error(
        "Error creating category:",
        error.response?.data || error.message
      );
      setMsg(
        "Something went wrong: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const getallUnassignedSubCat = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/unassigned-subcategories"
      );
      setUnassignedSubCat(res.data);
      console.log(res, "res");
    } catch (error) {
      console.error("Error fetching unassigned subcategories:", error);
    }
  };

  useEffect(() => {
    getallUnassignedSubCat();
  }, []);

  const getAllCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(`http://localhost:5000/api/category/getAll`);
      setCat(res.data);
      setMsg("");
      console.log(res.data, "all cat");
    } catch (error) {
      console.log(error);
      setMsg("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  const handelSubcat = (uac) => {
    setSelectedSubCat(uac.title);
    setSelectedSubCatId(uac._id); // Set the ID of the selected subcategory
  };

  const handleAddSubCatToCat = async () => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    try {
      const res = await axios.post(
        `http://localhost:5000/api/category/add_sub_categories_to_category/${selectedCatId}`,
        {
          categoryId: selectedCatId,
          subCategoryIds: [selectedSubCatId], // Send the ID of the selected subcategory in an array
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      setMsg(res.data.message || "Subcategory added to category successfully");
      setSelectedSubCat(null);
      getAllCat();
      getallUnassignedSubCat();
    } catch (error) {
      console.error(
        "Error adding subcategory to category:",
        error.response?.data || error.message
      );
      setMsg(
        "Something went wrong: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handelremovesubcatfromcat = async (categoryId, subCategoryId) => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));

    try {
      const res = await axios.post(
        `http://localhost:5000/api/category/remove-subcategory-from-list`,
        {
          categoryId,
          subCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      setMsg(res.data.message );
      console.log("subcat removed");
      getAllCat();
      getallUnassignedSubCat();
    } catch (error) {
      setMsg( "Something went wrong");
      console.log(error, "error removing subcat");
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
                name="categoryTitle"
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
                name="categoryImage"
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

      <h1 className="text-4xl">Unassigned Subcategories</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Unassigned Subcategory
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {unassignedSubCat.map((uac) => (
            <tr key={uac._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {uac?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={() => handelSubcat(uac)}
                >
                  Add to Category
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h1>Categories with their Subcategories</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                All Categories
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                All Subcategories Related to Category
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cat.map((allcat) => (
              <tr key={allcat._id} className="flex flex-col md:table-row">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <img
                    src={allcat.imageUrl}
                    width={50}
                    alt=""
                    className="mx-auto md:mx-0"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {allcat.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-full md:w-96">
                  <ul className="flex flex-col md:flex-row md:flex-wrap gap-4">
                    {allcat?.sub_category.map((subCat) => (
                      <li
                        key={subCat._id}
                        className="flex justify-between items-center"
                      >
                        <li>{subCat?.title}</li>
                        <button
                          className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                          onClick={() => {
                            handelremovesubcatfromcat(allcat._id, subCat._id);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSubCat && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Add Subcategory To Category
            </h2>
            <div className="mb-4">
              <select
                className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mb-4"
                onChange={(e) => setSelectedCatId(e.target.value)}
              >
                <option value="">Select Any Category</option>
                {cat.map((cats) => (
                  <option key={cats._id} value={cats._id}>
                    {cats.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="block w-full border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md py-3 mb-4"
                placeholder="Selected Subcategory"
                value={selectedSubCat}
                readOnly
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md"
                  onClick={handleAddSubCatToCat}
                >
                  Yes, Add
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-md"
                  onClick={() => setSelectedSubCat(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AddNewCategory;

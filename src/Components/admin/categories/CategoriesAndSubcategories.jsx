import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";
import CatManagement from "../CatAndSubCat/CatManagement";

const CategoriesAndSubcategories = () => {
  const [cat, setCat] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState(null);
  const [selectedSubCatId, setSelectedSubCatId] = useState(null); // Store the ID of the selected subcategory
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [mainCat, setMainCat] = useState({ categoryTitle: "" });
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [unassignedSubCat, setUnassignedSubCat] = useState([]);

  // States for creating a new sub-category
  const [subCategory, setSubCategory] = useState({ title: "" });
  // const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  // States for deleting/updating sub-categories
  const [subCategories, setSubCategories] = useState([]);
  // const [msg, setMsg] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainCat({ ...mainCat, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingCat = cat.find(
      (cats) =>
        cats.title.toLowerCase() === mainCat?.categoryTitle.toLowerCase()
    );
    if (existingCat) {
      setMsg("Category with this name already exists.");
      return;
    }

    setMsg(<Spinner />);

    const bearerToken = JSON.parse(localStorage.getItem("userData"));
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
      getAllCat();
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
      setMsg(res.data.message);
      console.log("subcat removed");
      getAllCat();
      getallUnassignedSubCat();
    } catch (error) {
      setMsg("Something went wrong");
      console.log(error, "error removing subcat");
    }
  };

  const getAllSubCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/subcategories"
      );
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

  // Handle input change for creating sub-category
  const handleInputChangee = (e) => {
    const { name, value } = e.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  // Check if sub-category exists and handle submit
  const handleSubmitt = async (e) => {
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
      const res = await axios.post(
        "http://localhost:5000/api/category/subcategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      setMessage(res.data.message || "Sub-category created successfully");
      getAllSubCat(); // Refresh after creation
      getallUnassignedSubCat();
    } catch (error) {
      setMessage(
        "Something went wrong: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Handle delete sub-category
  const deleteSubCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/category/subcategory/${id}`
      );
      setSubCategories(subCategories.filter((subcat) => subcat._id !== id));
      setDeleteId(null);
      setMsg("Sub-category deleted successfully");
      getAllSubCat();
      getallUnassignedSubCat();
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
      <div className="p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add New Category */}
          <div className="p-4 bg-white shadow-md rounded-lg border dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-200">
              Add New Category
            </h2>
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300"
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
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-700"
              >
                Add Category
              </button>
            </form>
            {msg && <div className="mt-4 text-red-600">{msg}</div>}
          </div>

          {/* Unassigned Subcategories */}
          <div className="p-4 bg-white shadow-md rounded-lg border dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">
              Unassigned Subcategories
            </h1>
            <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">
                    Unassigned Subcategory
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {unassignedSubCat.map((uac) => (
                  <tr key={uac._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                      {uac?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700"
                        onClick={() => handelSubcat(uac)}
                      >
                        Add to Category
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Categories with Subcategories */}
          <div className="p-4 bg-white shadow-md rounded-lg border dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">

            </h1>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">
                    All Categories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300">
                    Subcategories
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {cat.map((allcat) => (
                  <tr key={allcat._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {allcat.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      <ul className="flex flex-wrap gap-2">
                        {allcat.sub_category.map((subCat) => (
                          <li key={subCat._id} className="flex items-center">
                            <span>{subCat?.title}</span>
                            <button
                              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                              onClick={() =>
                                handelremovesubcatfromcat(
                                  allcat._id,
                                  subCat._id
                                )
                              }
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
        </div>
      </div>
{/* --------------------delete product 
 */}

<CatManagement newProp={getAllCat } />

 {/* --------------------delete product 
 */}
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

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add New Sub-category Card */}
          <div className="p-2 border-2 bg-white shadow-md  rounded-lg dark:border-gray-700 mt-4">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-200">
              Add New Sub Category
            </h2>

            <form className="space-y-6" onSubmit={handleSubmitt}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  value={subCategory?.title}
                  onChange={handleInputChangee}
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
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
          <div className="p-2 border-2 bg-white shadow-md rounded-lg dark:border-gray-700 mt-4">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-200">
              Manage Sub Category
            </h2>

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
                      <td className="px-4 py-2">
                        <img width={50} src={subcat?.image} alt="" />
                      </td>
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
          </div>
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

export default CategoriesAndSubcategories;

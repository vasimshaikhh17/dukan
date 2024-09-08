  import React, { useEffect, useState } from "react";
  import AdminLayout from "../layout/AdminLayout";
  import axios from "axios";
  import Spinner from "../others/Spinner";

  const UpdateCat = () => {
    const [cat, setCat] = useState([]);
    const [msg, setMsg] = useState();
    const [editCategory, setEditCategory] = useState(null);
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllCat = async () => {
      setMsg(<Spinner />);
      try {
        const res = await axios.get(`http://localhost:5000/api/category/getAll`);
        setCat(res.data);
        setMsg("");
      } catch (error) {
        console.log(error);
        setMsg("Something Went Wrong");
      }
    };

    const handleUpdateClick = (category) => {
      setEditCategory(category);
      setTitle(category.title);
      setIsModalOpen(true);
    };

    const handleUpdateSubmit = async () => {
      const bearerToken = JSON.parse(localStorage.getItem("userData"));

      setMsg(<Spinner />);
      try {
        await axios.put(
          `http://localhost:5000/api/category/update-category/${editCategory._id}`,
          { title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken.token}`,
            },
          }
        );
        getAllCat();
        setEditCategory(null);
        setIsModalOpen(false);
        setMsg("Category updated successfully");
      } catch (error) {
        console.log(error);
        setMsg("Something Went Wrong");
      }
    };

    useEffect(() => {
      getAllCat();
    }, []);

    return (
      <>
        {!msg ? (
          <div className="p-2">
            <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
              <h1 className="text-2xl font-bold text-center mb-5">All Category</h1>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-start">Image</th>
                      <th className="px-4 py-2 text-start">Category</th>
                      <th className="px-4 py-2 text-start">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.map((category) => (
                      <tr key={category._id} className="border-t">
                        <td className="px-4 py-2">
                          <img
                            src={category.imageUrl}
                            alt=""
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-2">{category.title}</td>
                        <td className="px-4 py-2">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleUpdateClick(category)}
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

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Update Category</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateSubmit();
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update Category
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 ml-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-4 h-60 flex items-center justify-center">
            {msg}
          </div>
        )}
      </>
    );
  };

  export default UpdateCat;

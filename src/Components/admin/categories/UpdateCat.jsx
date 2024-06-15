import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";

const UpdateCat = () => {
  const [cat, setCat] = useState([]);
  const [msg, setMsg] = useState();

  const getAllCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(`http://localhost:5000/api/category/getAll`);

      setCat(res.data);
      const data = res.data;
      console.log(data);
      setMsg("");
    } catch (error) {
      console.log(error);
      setMsg("Spmething Went Wrong");
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);
  return (
    <AdminLayout>
      {!msg ? (
        <div className="p-2">
          <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <h1 className="text-2xl font-bold text-center mb-5">
              All Category
            </h1>

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
                        <img src={category.imageUrl} alt="" 
                        className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2">{category.title}</td>
                      <td className="px-4 py-2">
                        <button className="text-blue-600 hover:text-blue-800">
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
    </AdminLayout>
  );
};

export default UpdateCat;

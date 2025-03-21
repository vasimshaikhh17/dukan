// src/components/Users.js
import React, { useEffect, useState } from "react";
import axios from "axios";
// import SomethingWentWrong from "../others/SomethingWentWrong";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Spinner from "../others/Spinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      setMsg(<Spinner />);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/all-users"
        );
        setUsers(response.data);

        setMsg("");
      } catch (err) {
        setMsg("Error Loading Data");
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
    
      {!msg ? (
       
          <div className=" border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 container mx-auto">
            <div >
              <div>
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg hidden md:table">
                  <thead>
                    <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">First Name</th>
                      <th className="py-3 px-6 text-left">Last Name</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Mobile</th>
                      <th className="py-3 px-6 text-left">Role</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm font-light">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-200 hover:bg-gray-100 "
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {user.firstname}
                        </td>
                        <td className="py-3 px-6 text-left">{user.lastname}</td>
                        <td className="py-3 px-6 text-left">{user.email}</td>
                        <td className="py-3 px-6 text-left">{user.mobile}</td>
                        <td className="py-3 px-6 text-left">{user.role}</td>
                        <td className="py-3 px-6 text-left">
                          <span
                            className={`py-1 px-3 rounded-full text-xs ${
                              user.isBlocked
                                ? "bg-red-500 text-white"
                                : "bg-green-500 text-white"
                            }`}
                          >
                            {user.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <button
                            className="px-3 py-2 text-xs font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={() => navigate(`/admin/user/${user._id}`)}
                          >
                            View more
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="grid gap-4 md:hidden">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {user.firstname} {user.lastname}
                        </h2>
                        <span
                          className={`py-1 px-3 rounded-full text-xs ${
                            user.isBlocked
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                          <strong>Mobile:</strong> {user.mobile}
                        </p>
                        <p>
                          <strong>Role:</strong> {user.role}
                        </p>
                      </div>
                      <button
                        className="mt-4 px-3 py-2 text-xs font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => navigate(`/admin/user/${user._id}`)}
                      >
                        View more
                      </button>
                    </div>
                  ))}
                </div>
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

export default Users;

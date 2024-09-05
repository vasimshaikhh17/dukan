import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../others/Spinner";

const Admin = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "b") {
        event.preventDefault();
        toggleDrawer();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);




  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleDrawer}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <i className="ri-menu-2-line"></i>
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Dukan
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute top-10 right-0 bg-slate-100 rounded-lg shadow-md mt-2 py-2 w-48 z-50">
                      <h4 className="block px-4 py-2 text-center">
                        <i className="ri-user-line">
                          {" "}
                          {user.firstname} {user.lastname}
                        </i>
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex pt-20">
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
            onClick={toggleDrawer}
          ></div>
        )}
        <aside
          className={`fixed top-14 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-transform transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/admin"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <i className="ri-user-line flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <i className="ri-menu-search-line flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Categories
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/allproducts"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <i className="ri-shopping-bag-line flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    All Products
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/top-products"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <i className="ri-align-top flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Top Products
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/all-orders"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <i className="ri-shape-line flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Orders
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/catandsubcat"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <i className="ri-shape-line flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                 Cat And Sub Cat
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      
    </>
  );
};

export default Admin;

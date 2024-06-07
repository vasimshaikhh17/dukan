import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../others/Spinner";

const Admin = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));

  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // State for user dropdown
  const dropdownRef = useRef(null); // Reference for the dropdown


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
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setMsg(<Spinner />);
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    // console.log(bearerToken,'token')


    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${bearerToken._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      // console.log(response,'className=')
      if (response.data) {
        if (response?.data?.getUser?.role !== "admin") {
          toast.error("Sorry You are not an Admin");
          navigate("/");
        }
        setMsg("");
      }
    } catch (error) {
      // toast.error("Something went Wrong");
      setMsg("Something went wrong");
      toast.error("Sorry You are not an Admin");
      navigate("/");
    }
  };

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
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <i className="ri-menu-2-line"></i>
              </button>
              <a href="" className="flex ms-2 md:me-24">
                {/* <img
              src=""
              className="h-8 me-3"
              alt="Logo"
            /> */}
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
                    <div className="absolute top-10 right-0  bg-slate-100 rounded-lg shadow-md mt-2 py-2 w-48 z-50">
                      <h4 className="block px-4 py-2 text-center">
                        <i className="ri-user-line">{" "}{user.firstname} {user.lastname}</i> 
                      
                      </h4>
                   
                    </div>
                  )}
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isDrawerOpen && (
        <aside
          // id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          // data-drawer-target="logo-sidebar"
          // aria-label="Sidebar"
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

            </ul>
          </div>
        </aside>
      )}
      {/* <div className="p-4 sm:ml-64">
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
     cool
    </div>
  </div> */}
      <ToastContainer />
    </>
  );
};

export default Admin;

import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Spinner from "../../Components/admin/others/Spinner";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [cat, setCat] = useState([]);
  const [msg, setMsg] = useState();

  const user = JSON.parse(localStorage.getItem("userData"));
  const handleLinkClick = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getAllCat = async () => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get("http://localhost:5000/api/category/getAll");
      setCat(res.data);
      setMsg("");
    } catch (error) {
      setMsg("something went wrong");
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  const toggleMobileDropdown = (index) => {
    setMobileDropdownOpen((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <nav className="bg-white fixed top-0 w-full z-50 shadow-md h-16 py-2 md:px-10">
        <div className="flex items-center font-medium justify-between mx-3 md:mx-0">
          <Link to="/">
            <img src={Logo} alt="logo" className="md:cursor-pointer z-50" />
          </Link>
          <div className="flex gap-5 items-center">
            <ul className="md:flex hidden uppercase items-center gap-8">
              {cat.map((cats) => (
                <div className="group relative" key={cats?._id}>
                  <Link
                    to="/tshirts"
                    className="py-2 flex justify-between items-center md:pr-0 pr-5 group hover:text-red-600 text-[12px]"
                  >
                    {cats?.title}
                  </Link>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:md:block hover:md:block w-56 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                    <div className="bg-white mx-auto p-2 grid grid-cols-1 w-52 container border-2">
                      <div className="flex items-center justify-start">
                        <img
                          src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fproduct%2Fd%2Fp%2Fdp101-1046910.jpg&w=256&q=75"
                          alt=""
                          className="w-10 h-10"
                        />
                        <Link
                          to="/tshirts/casual-shirts"
                          className="hover:text-red-600 duration-100 pl-3 text-[12px]"
                        >
                          Casual shirts
                        </Link>
                      </div>
                      <div className="flex items-center justify-start mt-2">
                        <img
                          src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fproduct%2Fd%2Fp%2Fdp201-1029510-1.jpg&w=256&q=75"
                          alt=""
                          className="w-10 h-10"
                        />
                        <Link
                          to="/tshirts/formal-shirts"
                          className="hover:text-red-600 duration-100 pl-3 text-[12px]"
                        >
                          Formal shirts
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="hidden lg:flex w-72 relative">
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-800 rounded pl-10"
                  placeholder="What are you looking for...  "
                />
                <i className="ri-search-line absolute left-3 top-1 text-gray-400"></i>
              </div>
            </ul>
            <Link to="/wishlist" className="hover:text-red-600 duration-300">
              <i className="ri-heart-line text-2xl"></i>
            </Link>
            <Link to="/cart" className="hover:text-red-600 duration-300">
              <i className="ri-shopping-bag-3-line text-2xl"></i>
            </Link>
            <i
              className="ri-search-line lg:hidden text-2xl"
              onClick={() => setSearchOpen(!searchOpen)}
            ></i>
            {user === null || 0 ? (
              <Link
                to="/login"
                className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              >
                Login
              </Link>
            ) : (
              <>
                <div className="relative" ref={dropdownRef}>
                  <i
                    className="ri-user-line text-2xl cursor-pointer hover:text-red-600 duration-300"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  ></i>
                  {userDropdownOpen && (
                    <div className="absolute top-10 right-0 bg-slate-100 rounded-lg shadow-md mt-2 py-2 w-48 z-50">
                      <h4 className="block px-4 py-2 text-center">
                        <i className="ri-user-line"></i> {user.firstname}{" "}
                        {user.lastname}
                      </h4>
                      <button
                        onClick={logout}
                        className="w-full items-center text-center bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border-red-500 hover:border-transparent rounded"
                      >
                        <i className="ri-logout-box-line"></i>
                        &nbsp; Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            <div
              className="text-3xl md:hidden z-50"
              onClick={() => setOpen(!open)}
            >
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
            </div>
          </div>

          <ul
            className={`
              md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-14 pl-4
              duration-500 ${open ? "left-0" : "left-[-100%]"}
            `}
          >
            {cat.map((cats, index) => (
              <li key={cats._id}>
                <div className="flex justify-between items-center mx-6">
                  <Link
                    to="/tshirts"
                    className="text-[12px]"
                    onClick={handleLinkClick}
                  >
                    {cats?.title}
                  </Link>
                  <button
                    className="text-lg"
                    onClick={() => toggleMobileDropdown(index)}
                  >
                    {mobileDropdownOpen === index ? "-" : "+"}
                  </button>
                </div>
                {mobileDropdownOpen === index && (
                  <div className="pl-5">
                    <div className="flex items-center justify-start mt-2">
                      <img
                        src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fproduct%2Fd%2Fp%2Fdp101-1046910.jpg&w=256&q=75"
                        alt=""
                        className="w-10 h-10"
                      />
                      <Link
                        to="/tshirts/casual-shirts"
                        className="hover:text-red-600 duration-100 pl-3 text-[12px]"
                        onClick={handleLinkClick}
                      >
                        Casual shirts
                      </Link>
                    </div>
                    <div className="flex items-center justify-start mt-2">
                      <img
                        src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fproduct%2Fd%2Fp%2Fdp201-1029510-1.jpg&w=256&q=75"
                        alt=""
                        className="w-10 h-10"
                      />
                      <Link
                        to="/tshirts/formal-shirts"
                        className="hover:text-red-600 duration-100 pl-3 text-[12px]"
                        onClick={handleLinkClick}
                      >
                        Formal shirts
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {searchOpen && (
        <div className="lg:hidden w-full p-5 bg-white fixed top-16 z-40 flex justify-between">
          <div className="relative w-11/12">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded pl-10"
              placeholder="What are you looking for..."
            />
            <i className="ri-search-line absolute left-3 top-2 text-gray-400"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

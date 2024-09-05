import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/lo.png";
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
  const [subCat, setSubCat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("userData"));
  const handleLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
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
      console.log(res.data , "cat")
    } catch (error) {
      console.log(error,'erre')
      setMsg("something went wrong");
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  const toggleMobileDropdown = (index) => {
    setMobileDropdownOpen((prev) => (prev === index ? null : index));
  };

  // useEffect(() => {
  //   getAllSubCat();
  // }, []);

  // const getAllSubCat = async () => {
  //   setMsg(<Spinner />);
  //   try {
  //     const res = await axios.get(
  //       "http://localhost:5000/api/category/subcategories"
  //     );
  //     setSubCat(res.data);
  //     setMsg("");
  //   } catch (error) {
  //     setMsg("Something went wrong");
  //   }
  // };

  const handleSearch = async (query) => {
    setMsg(<Spinner />);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/product/search?search=${query}`
      );
      setSearchResults(res.data.data.products);
      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <>
      <nav className="bg-white sticky top-0 w-full z-50 shadow-md  py-2 md:px-10 ">
        <div className="flex items-center font-medium justify-between mx-3 md:mx-0 ">
          <Link to="/">
            {/* <img
              src={Logo}
              alt="logo"
              width={150}
              className="md:cursor-pointer z-50"
            /> */}
            <p className="md:cursor-pointer z-50 text-xl" >Bytefaze Cloathing</p>
          </Link>
          <div className="flex gap-5 items-center">
            <ul className="md:flex hidden uppercase items-center gap-8">
              {cat.map((cats) => (
                <div className="group relative" key={cats?._id}>
                  <Link
                     to={`/products/${cats?.title.toLowerCase()}`} 
                    className="py-2 flex justify-between items-center md:pr-0 pr-5 group hover:text-red-600 text-[12px]"
                  >
                    {cats?.title}
                  </Link>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:md:block hover:md:block w-56 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                    {cats?.sub_category?.map((newsubcat) => (
                      <div
                        // key={subcat._id}
                        className="bg-white mx-auto p-2 grid grid-cols-1 w-52 container "
                      >
                        <div className="flex items-center justify-start ">
                          <img
                            src={newsubcat?.image}
                            alt=""
                            className="w-10 h-10 "
                          />
                          <Link
                            to={`/product/${newsubcat?.title.toLowerCase()}`} 
                            className="hover:text-red-600 duration-100 pl-3 text-[12px]"
                          >
                            {newsubcat?.title}
                          </Link>
                        </div>
                      </div>
                    ))}


                  </div>
                </div>
              ))}
              <div className="hidden lg:flex w-72 relative" ref={searchRef}>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-800 rounded pl-10"
                  placeholder="What are you looking for..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <i className="ri-search-line absolute left-3 top-1 text-gray-400"></i>
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchResults.map((product) => (
                      <Link key={product._id} to={`/details/${product._id}`}>
                        <div className="flex items-center p-2 hover:bg-gray-100">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 object-cover"
                          />
                          <span className="ml-3">{product.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </ul>
            <Link
              to="/wishlist"
              className="relative group hover:text-red-600 duration-300"
            >
              <i className="ri-heart-line text-xl"></i>
              <span className="tooltip-text absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 duration-300">
                Wishlist
              </span>
            </Link>

            <Link
              to="/cart"
              className="relative group hover:text-red-600 duration-300"
            >
              <i className="ri-shopping-cart-line text-xl"></i>
              <span className="tooltip-text absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 duration-300">
                Cart
              </span>
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
                    className="ri-user-line text-xl cursor-pointer hover:text-red-600 duration-300"
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
                    {subCat.map((subcat) => (
                      <div
                        key={subcat._id}
                        className="flex items-center justify-start mt-2"
                      >
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
                          {subcat?.sub_category}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {searchOpen && (
        <div
          className="lg:hidden w-full p-5 bg-white fixed top-16 z-40 flex justify-between"
          ref={searchRef}
        >
          <div className="relative w-11/12">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded pl-10"
              placeholder="What are you looking for..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="ri-search-line absolute left-3 top-2 text-gray-400"></i>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link key={product._id} to={`/details/${product?._id}`}>
                    <div className="flex items-center p-2 hover:bg-gray-100">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-10 h-10 object-cover"
                      />
                      <span className="ml-3">{product.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

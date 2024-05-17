import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="bg-white fixed top-0 w-full z-50 shadow-md h-16 py-2 md:px-10">
        <div className="flex items-center font-medium justify-between">
          <img src={Logo} alt="logo" className="md:cursor-pointer h-9 z-50" />
          <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
            <li>
              <Link to="/" className="inline-block">
                Home
              </Link>
            </li>
            <NavLinks />
          </ul>
          <div className="hidden lg:flex w-1/3 relative">
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-800 rounded pl-10"
              placeholder="Search..."
            />
            <i className="ri-search-line absolute left-3 top-1 text-gray-400"></i>
          </div>
          <div className="flex gap-5 items-center">
            <i className="ri-heart-line text-2xl"></i>
            <Link to="/cart">
              <i className="ri-shopping-cart-2-line text-2xl"></i>
            </Link>
            <i
              className="ri-search-line lg:hidden text-2xl"
              onClick={() => setSearchOpen(!searchOpen)}
            ></i>
            <Link
              to="/login"
              className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
            >
              Login
            </Link>
            <div
              className="text-3xl md:hidden z-50"
              onClick={() => setOpen(!open)}
            >
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
            </div>
          </div>

          {/* Mobile nav */}
          <ul
            className={`
              md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
              duration-500 ${open ? "left-0" : "left-[-100%]"}
            `}
          >
            <li>
              <Link to="/" className="inline-block" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <NavLinks handleLinkClick={handleLinkClick} />
            <div className="py-5">
              <button>cool2</button>
            </div>
          </ul>
        </div>
      </nav>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="lg:hidden w-full p-5 bg-white fixed top-16 z-40 flex justify-between">
          <div className="relative w-11/12">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded pl-10"
              placeholder="Search..."
            />
            <i className="ri-search-line absolute left-3 top-2 text-gray-400"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

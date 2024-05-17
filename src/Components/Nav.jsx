import React, { useState } from "react";
const Nav = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="font-bold text-2xl cursor-pointer mx-2 flex items-center font-[Poppins] text-gray-800 md:sticky md:top-0 left-0 right-0 md:w-full">
              <span className="font-bold text-2xl md:flex flex md:mx-1 text-gray-800">
                <ion-icon name="logo-apple-appstore"></ion-icon>
              </span>
              Faze
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center">
            <div className="flex mx-3">
              {Links.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="text-gray-600 hover:text-orange-400 px-2 py-2 rounded-md text-base font-medium "
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="relative">
              <input
                className="block w-full bg-gray-200 border-transparent rounded-md py-2 px-2 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 sm:text-sm"
                type="text"
                placeholder="Search Products Here"
              />
              <span className="absolute w-2 right-3 top-2">
                <ion-icon name="search-outline"></ion-icon>
              </span>
            </div>
          </div>
          <div className=" flex md:flex cursor-pointer md:gap-4 gap-2 mx-1">
            {/* <div className="text-3xl peer icon_wrapper hover:text-red-600">
              <ion-icon name="person-circle-outline"></ion-icon>
            </div> */}
            <div className="text-3xl hover:text-red-600 peer  icon_wrapper relative">
              <ion-icon name="bag-handle-outline"></ion-icon>
            </div>
            <div className="text-3xl  hover:text-red-600 icon_wrapper relative">
              <ion-icon name="heart-outline"></ion-icon>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 bg-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <ion-icon name={open ? "close" : "menu"}></ion-icon>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden bg-indigo-300 ${open ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {Links.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Nav;

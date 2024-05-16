import React, { useState } from "react";
// import Button from "./Button";

const Nav = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Cool", link: "/" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar-container">
      <div className="shadow-md w-full ">



        <div className="md:px-10 lg:block mx-3 md:flex md:items-center  md:justify-center py-3">
          <div className="flex justify-between items-center pt-2">
            {/* <h1 className="md:text-4xl mx-2 text-2xl text-red-600 font-medium ">Shop</h1> */}
            <div className="font-bold text-2xl cursor-pointer mx-6 flex items-center font-[Poppins] text-gray-800">
            <span className="md:text-3xl text-2xl text-red-600 mx-1 pt-2">
              <ion-icon name="logo-apple-appstore"></ion-icon>
            </span>
            Faze
          </div>
            <div className="absolute mx-0 md:top-5 top-20 md:flex md:justify-center md:items-center md:left-96  left-9 w-full max-w-[300px]">
              <input    
                className="bg-[#bebebe] border-none placeholder-gray-950 outline-none md:px-3 mx-0 px-1 md:py-3 py-3 md:rounded-[50px] rounded-xl w-full"
                type="text"
                placeholder="Search Products Here"
              />
              <span className="absolute top-0 right-0 mt-4 md:mr-5 mr-1">
                <ion-icon name="search-outline"></ion-icon>
              </span>
            </div>

            <div className="flex md:gap-4 gap-2 mx-1">
              <div className="text-3xl icon_wrapper">
                <ion-icon name="person-circle-outline"></ion-icon>
              </div>
              <div className="text-3xl icon_wrapper relative">
                <ion-icon name="bag-handle-outline"></ion-icon>
              </div>
              <div className="text-3xl icon_wrapper relative">
              <ion-icon name="heart-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>



        <div className="md:hidden justify-between py-4 md:mt-7  mt-16  md:px-10 px-7">
          {/* <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="logo-apple-appstore"></ion-icon>
            </span>
            Designer
          </div> */}

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute flex top-6 left-2 md:top-6 overflow-y-hidden cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center  overflow-y-auto max-h-[calc(100vh-64px)]  md:justify-center bg-red-100 h-auto md:px-[510px] md:pb-0 pb-12 absolute md:static  md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "w-56 top-20 z-[99999]" : " top-16 left-[-600px] "
            }`}
          >
            {Links.map((link) => (
              <li className="md:ml-8 md:hidden text-xl md:my-0 my-7 flex md:justify-center">
                <a
                  href={link.link}
                  className="text-gray-600 hover:text-orange-400" 
                >
                  {link.name}
                </a>
              </li>
            ))}

            {/* <Button /> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
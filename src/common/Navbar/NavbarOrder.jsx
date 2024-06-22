import React from 'react';
import { Link } from 'react-router-dom';
import walk from "../../assets/dog-walking.gif";

const NavbarOrder = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <nav className="flex items-center justify-between top-0 z-100 fixed w-full bg-white border-b-2 py-5 px-10">
        <div className="relative">
          <Link to={"/"} className="font-bold">Dukan</Link>
          <img
            src={walk}
            alt=""
            width={40}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ animation: "move-very-slow 50s linear infinite", left: "100%" }}
          />
        </div>

        <div className="flex items-center">
          <i className="ri-user-line text-red-500 mr-2"></i>
          {user.firstname} {user.lastname}
        </div>
      </nav>
      <style jsx>{`
        @keyframes move-very-slow {
          0% {
            left: 100%;
          }
          100% {
            left: calc(100vw - 20rem); /* Adjust this value based on your layout */
          }
        }
      `}</style>
    </>
  );
}

export default NavbarOrder;

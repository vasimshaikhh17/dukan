import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quality from "../../assets/quality.svg";
import payment from "../../assets/icons-secure.png";
import returnicon from "../../assets/icon-return.svg";
import axios from "axios";
import Spinner from "../../Components/admin/others/Spinner";

const Footer = () => {
  const [cat, setCat] = useState([]);
  const [msg, setMsg] = useState();

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
  return (
    <footer className="bg-white">
      <hr />
      <div className="flex flex-row  flex-wrap justify-around items-center p-2 bg-white dark:bg-zinc-800 ">
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 mb-2 md:mb-0">
          <img
            src={quality}
            alt="Premium Quality"
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <div className="text-center md:text-left">
            <h3 className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 ">
              Premium Quality
            </h3>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 hidden md:block">
              All the clothing products are made
              <br /> from 100% premium quality fabric.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 mb-2 md:mb-0">
          <img
            src={payment}
            alt="Secure Payments"
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <div className="text-center md:text-left ">
            <h3 className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 ">
              Secure Payments
            </h3>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 hidden md:block">
              Highly Secured SSL-Protected <br /> Payment Gateway.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 mb-2 md:mb-0">
          <img
            src={returnicon}
            alt="7 Days Return"
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <div className="text-center md:text-left ">
            <h3 className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              7 Days Return
            </h3>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 hidden md:block">
              Return or exchange the orders <br /> within 7 days of delivery.
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className=" md:mx-auto sm:mx-4  max-w-screen-xl  sm:px-4 ">
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2  px-4">
          <div className="lg:mx-auto sm:mx-4  max-w-sm lg:max-w-none  md:text-left">
            <strong className="font-medium text-gray-900">
              REGISTERED OFFICE ADDRESS
            </strong>
            <p className="mt-4 text-gray-500 lg:text-left lg:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Praesentium natus quod eveniet aut perferendis distinctio iusto
              repudiandae, provident velit earum?
            </p>

            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
    <i className="ri-instagram-line"></i>
              </a>


            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 px-4 md:grid-cols-3 lg:grid-cols-3 lg:text-left">
            <div>
              <strong className="font-medium text-gray-900"> Category </strong>

              <ul className="mt-6 ">
              {cat.map((category) => (
                  <li key={category._id}>
                    <Link
                      className="text-gray-700 transition hover:text-gray-700/75"
                      to=""
                    >
                      {category.title}
                    </Link>
                  </li>
              ))}
              </ul>
            </div>

            <div>
              <strong className="font-medium text-gray-900">
                Usefull Links
              </strong>

              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    to="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    to="/contact-us"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    to={"/shipping-policy"}
                  >
                    Shipping Policy
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                   to={"/privacy-policy"}
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                   to="/how-to-order"
                  >
                    How to Order
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-gray-900"> Support </strong>

              <ul className="mt-6 space-y-1">
                <li>
                  <i className="ri-mail-line"></i>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    info@gmail.com
                  </a>
                </li>

                <li>
                  <i className="ri-phone-line"></i>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    +919999999999
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className=" border-t border-gray-100 mt-4">
          <p className="text-center text-xs/relaxed text-gray-500">
            © Company 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

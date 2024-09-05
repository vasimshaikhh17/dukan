import React, { useEffect } from "react";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      {children}
      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={true}
        theme="colored"
      />
    </>
  );
};

export default Layout;

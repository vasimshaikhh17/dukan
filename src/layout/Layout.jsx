import React, { useEffect } from "react";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router-dom";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

const Layout = ({ children }) => {


  return (
    <>
     
      <Navbar />
      <ScrollToTop />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

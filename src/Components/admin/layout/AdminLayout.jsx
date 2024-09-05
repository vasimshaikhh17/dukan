import React from "react";
import Admin from "../dashboard/Admin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminLayout = ({ children }) => {
  return (
    <>
      <Admin />
      {children}
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

export default AdminLayout;

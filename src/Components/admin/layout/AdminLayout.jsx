import React from "react";
import Admin from "../dashboard/Admin";


const AdminLayout = ({ children }) => {
  return (
    <>
      <Admin />
      {children}
    </>
  );
};

export default AdminLayout;

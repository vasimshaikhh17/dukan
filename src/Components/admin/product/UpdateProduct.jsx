import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  

  const [product, setProduct] = useState();
  const getProductDetail = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/product/get/${params?.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken.token}`,
        },
      }
    );
    setProduct(response?.data);
    // console.log(response,'first')
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          Update product
        </div>
        <p>

        </p>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
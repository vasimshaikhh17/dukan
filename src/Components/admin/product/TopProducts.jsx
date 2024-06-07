import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";

const TopProducts = () => {
  const [msg, setMsg] = useState("");
  const [productList, setProductList] = useState([]);
  const [productListId, setproductListId] = useState([]);

  useEffect(() => {
    getTopProducts();
  }, []);

  const getTopProducts = async () => {
    setMsg(<Spinner />);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/top-product-list"
      );
      if (response && response.data) {
        setproductListId(response.data.productId);
      }
      console.log(response);

      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  useEffect(() => {
    if (productListId.length > 0) {
      ourTopProduct();
    }
  }, [productListId]);

  const ourTopProduct = async () => {
    setMsg(<Spinner />);
    try {
      const arr = [];
      for (let i = 0; i < productListId.length; i++) {
        const response = await axios.get(
          `http://localhost:5000/api/product/get/${productListId[i]}`
        );

        arr.push(response.data);
      }
      setMsg("");
      setProductList(arr);
    } catch (error) {
      setMsg("Something Went Wrong");
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-xl font-semibold mb-4">Top Category</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-start">Image</th>
                  <th className="px-4 py-2 text-start">Title</th>
                  <th className="px-4 py-2 text-start">Description</th>
                </tr>
              </thead>
              <tbody>
                {productList && productList.length > 0 ? (
                  productList.map((product) => (
                    <tr key={product?._id} className="border-t">
                      <td className="px-4 py-2">
                        <img
                          src={
                            product?.images[0] || "https://placehold.co/600x400"
                          }
                          width={40}
                          alt=""
                        />
                      </td>
                      <td className="px-4 py-2">{product?.title}</td>
                      <td className="px-4 py-2">{product?.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center">
                      {msg}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TopProducts;

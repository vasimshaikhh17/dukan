import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Spinner from "../others/Spinner";

const TopProducts = () => {
  const [msg, setMsg] = useState("");
  const [productList, setProductList] = useState([]);
  const [positionId, setPositionId] = useState({
    prodId: "",
    newPosition: "",
  });
  const [refreshData, setRefreshData] = useState(false); // State to trigger re-render

  // console.log(positionId)

  useEffect(() => {
    return () => {
      getTopProducts();
    };
  }, [refreshData]);

  const getTopProducts = async () => {
    setMsg(<Spinner />);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/topProduct/top-product-list"
      );
      if (response && response.data) {
        setProductList(response.data.products);
      }
      // console.log(response);

      setMsg("");
    } catch (error) {
      setMsg("Something went wrong");
    }
  };

  const handlePosition = async (selectedValue) => {
    const [position, productId] = selectedValue.split(":");

    setPositionId({
      prodId: productId,
      newPosition: position,
    });

    // console.log(position)
  };

  const changePosition = async () => {
    const bearerToken = JSON.parse(localStorage.getItem("userData"));
    try {
      if (!bearerToken) {
        throw new Error("Login Required");
      }

      const response = await axios.put(
        "http://localhost:5000/api/topProduct/change-product-positon",
        {
          prodId: positionId?.prodId,
          newPosition: positionId?.newPosition,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );

      if (response.data.products) {
        console.log(response, "Wishlist");
        setRefreshData((prev) => !prev);

        // toast.success(response.data.msg);
      }
    } catch (error) {
      console.log(error); // Log the error message
      if (error.response) {
        console.log(error.response.data); // Log the error response data if available
      }
      // Handle the error here, e.g., display a toast or navigate to a specific page
      // toast.error("Something went wrong");
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
                  <th className="px-4 py-2 text-start">Current Position</th>
                  <th className="px-4 py-2 text-start">Change Position</th>
                </tr>
              </thead>
              <tbody>
                {productList && productList.length > 0 ? (
                  productList.map((product, index) => (
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
                      <td className="px-4 py-2">
                        <select
                          className="border border-gray-300 rounded p-1"
                          onChange={(event) =>
                            handlePosition(event.target.value)
                          }
                        >
                          <option value="">{index + 1}</option>
                          {productList.map((_, index) => (
                            <option
                              key={index}
                              value={`${index}:${product?._id}`}
                            >
                              {index + 1}
                            </option>
                          ))}
                        </select>{" "}
                      </td>
                      <td>
                        <button onClick={changePosition}>
                          Change Position
                        </button>
                      </td>
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

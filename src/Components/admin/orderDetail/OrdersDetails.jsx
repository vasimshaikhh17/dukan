import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";

const OrdersDetails = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const bearerToken = JSON.parse(localStorage.getItem("userData"));

  const getOrderDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/order/all-orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error, "errortttt");
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const handleViewMore = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View More</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.orderStatus === "Processing" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.shippingAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.orderby.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.orderby.firstname} {order.orderby.lastname}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewMore(order)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-full h-full md:w-3/4 md:h-auto p-8 rounded-lg overflow-auto">
                <button onClick={handleCloseModal} className="text-red-500 font-bold text-xl mb-4">Close</button>
                <div className="p-4 border rounded-lg bg-white shadow-md w-full">
                  <p
                    className={`text-white text-center py-1 rounded ${
                      selectedOrder.orderStatus === "Processing" ? "bg-green-500" : "bg-red-600"
                    }`}
                  >
                    {selectedOrder.orderStatus}
                  </p>
                  <div className="mt-2">
                    <h2 className="font-semibold">Shipping Address:</h2>
                    <p>{selectedOrder.shippingAddress}</p>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-semibold">User Details:</h2>
                    <p>Email: {selectedOrder.orderby.email}</p>
                    <p>Name: {selectedOrder.orderby.firstname} {selectedOrder.orderby.lastname}</p>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-semibold">Payment Details:</h2>
                    <p>Amount: {selectedOrder.paymentIntent.amount}</p>
                    <p>Currency: {selectedOrder.paymentIntent.currency}</p>
                    <p>Status: {selectedOrder.paymentIntent.status}</p>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-semibold">Products:</h2>
                    <div className="flex">

                    {selectedOrder.products.map((prod, prodIndex) => (
                      <div key={prodIndex} className="w-fit mt-2 p-2 border rounded-lg bg-gray-50">
                        <h3 className="font-semibold">Product {prodIndex + 1}:</h3>
                        <p>Color: {prod?.color}</p>
                        <p>Count: {prod?.count}</p>
                        <p>Brand: {prod.product?.brand}</p>
                        <p>Description: {prod.product?.description}</p>
                        <p>Price: {prod.product?.price}</p>
                        {prod.product?.images?.[0] && (
                          <img
                            src={prod.product.images[0]}
                         
                            alt="Product image"
                            className="w-32 h-32 object-cover mt-2 rounded"
                          />
                        )}
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersDetails;
 
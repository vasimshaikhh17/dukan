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
      console.error(error);
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
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-600">Order Status</th>
                <th className="p-4 font-medium text-gray-600">Shipping Address</th>
                <th className="p-4 font-medium text-gray-600">Email</th>
                <th className="p-4 font-medium text-gray-600">Name</th>
                <th className="p-4 font-medium text-gray-600">View More</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "Processing"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-4">{order?.shippingAddress}</td>
                  <td className="p-4">{order?.orderby?.email}</td>
                  <td className="p-4">
                    {order?.orderby?.firstname} {order?.orderby?.lastname}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewMore(order)}
                      className="text-blue-600 hover:underline"
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
            <div className="bg-white w-full max-w-4xl h-auto p-6 rounded-lg overflow-y-auto">
              <button
                onClick={handleCloseModal}
                className="text-red-500 font-bold text-xl mb-4"
              >
                Close
              </button>
              <div className="space-y-4">
                <div className={`text-white text-center py-2 rounded ${selectedOrder.orderStatus === "Processing" ? "bg-green-500" : "bg-red-600"}`}>
                  {selectedOrder.orderStatus}
                </div>
                <div>
                  <h3 className="font-semibold">Shipping Address:</h3>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
                <div>
                  <h3 className="font-semibold">User Details:</h3>
                  <p>Email: {selectedOrder.orderby.email}</p>
                  <p>
                    Name: {selectedOrder.orderby.firstname} {selectedOrder.orderby.lastname}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Payment Details:</h3>
                  <p>Amount: ${selectedOrder.paymentIntent.amount}</p>
                  <p>Currency: {selectedOrder.paymentIntent.currency}</p>
                  <p>Status: {selectedOrder.paymentIntent.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Products:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedOrder.products.map((prod, prodIndex) => (
                      <div
                        key={prodIndex}
                        className="p-4 border rounded-lg bg-gray-50"
                      >
                        <h4 className="font-semibold">Product {prodIndex + 1}</h4>
                        <p>Color: {prod?.color}</p>
                        <p>Quantity: {prod?.quantity}</p>
                        <p>Size: {prod?.size}</p>
                        <p>Brand: {prod.product?.brand}</p>
                        <p>Price: ${prod.product?.price}</p>
                        {prod.product?.images?.[0] && (
                          <img
                            src={prod.product.images[0]}
                            alt="Product"
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
    </AdminLayout>
  );
};

export default OrdersDetails;

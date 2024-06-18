import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";

const OrdersDetails = () => {
  const bearerToken = JSON.parse(localStorage.getItem("userData"));
  const [ orders, setOrders ] = useState([]);


  const getOrders = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/order/get-orders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken.token}`,
          },
        }
      );

      if (result.data) {
        setOrders(result.data);
        console.log(result.data, "orderssssss");
      }
    } catch (error) {
      console.log(error, "order error");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <AdminLayout>


    <div className="p-4 ">
      <div className=" border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
        {
            orders.map((order)=>(
              <>
              
                <h1>{order.createdAt}</h1>
                <h1>{order.orderStatus}</h1>
                <h1>{order.paymentIntent.amount}</h1>

              </>

            ))
        }
      </div>
    </div>
    </AdminLayout>

  );
};

export default OrdersDetails;

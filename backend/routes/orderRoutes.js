import express from "express";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { addOrSelectAddress, createOrder, deleteOrder, getAllOrders, getOrderById, getUserOrders, handlePaymentStatus, processOrderAndPayment, updateOrderStatus } from "../controller/orderController.js";

const router = express.Router();

router
  .post("/create-order",authMiddleware, createOrder)

  .post('/create-order-and-pay', authMiddleware, processOrderAndPayment)
  .post('/status', handlePaymentStatus)

  // .post("/status", status)
  .get("/get-orders",authMiddleware,isAdmin, getUserOrders)
  .get("/get-orders/:orderId",authMiddleware,isAdmin, getOrderById)
  .put("/:orderId/status",authMiddleware,isAdmin, updateOrderStatus)
  .delete("/:orderId",authMiddleware,isAdmin, deleteOrder)
  .get("/all-orders",authMiddleware,isAdmin, getAllOrders)
  .post("/add-or-select-address",authMiddleware, addOrSelectAddress)


  //Order and Payment methods bellowww



export default router;
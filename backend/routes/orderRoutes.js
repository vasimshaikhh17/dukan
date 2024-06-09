import express from "express";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { createOrder, deleteOrder, getAllOrders, getOrderById, getUserOrders, makePayment, updateOrderStatus } from "../controller/orderController.js";

const router = express.Router();

router
  .post("/create-order", createOrder)
  .get("/get-orders",authMiddleware,isAdmin, getUserOrders)
  .get("/get-orders/:orderId",authMiddleware,isAdmin, getOrderById)
  .put("/:orderId/status",authMiddleware,isAdmin, updateOrderStatus)
  .delete("/:orderId",authMiddleware,isAdmin, deleteOrder)
  .get("/all-orders",authMiddleware,isAdmin, getAllOrders)

  .post('/make-payment',makePayment)


export default router;
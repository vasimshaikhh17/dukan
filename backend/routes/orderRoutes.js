import express from "express";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { createOrder } from "../controller/orderController.js";

const router = express.Router();

router
  .post("/create-order", createOrder)


export default router;

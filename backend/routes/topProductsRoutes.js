import express from "express";
import {
  getTopProducts,
  addTopProducts,
  updateTopProductPosition,
} from "../controller/topProducts.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .get("/top-product-list", getTopProducts)
  .put("/top-products", authMiddleware, addTopProducts)
  .put(
    "/change-product-positon",
    authMiddleware,
    isAdmin,
    updateTopProductPosition
  );

export default router;

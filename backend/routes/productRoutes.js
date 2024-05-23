import express from "express";
import {
  addToWishList,
  addTopProducts,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getTopProducts,
  totalRatings,
  updateProduct,
  updateTopProductPosition,
} from "../controller/productController.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  // .post("/", authMiddleware, isAdmin, createProduct)
  // .put("/wishlist", authMiddleware, addToWishList)
  // .get("/:id", getProduct)
  // .get("/", getAllProduct)
  // .put("/:id", authMiddleware, isAdmin, updateProduct)
  // .delete("/:id", authMiddleware, isAdmin, deleteProduct);
  .post("/create-product", authMiddleware, isAdmin, createProduct)
  .post("/get/:id", getProduct)
  .put("/wishlist", authMiddleware, addToWishList) 
  .put("/top-products", authMiddleware, addTopProducts)
  .put(
    "/change-product-positon",
    authMiddleware,
    isAdmin,
    updateTopProductPosition
  )
  .get("/top-product-list",getTopProducts)
  .put("/ratings", authMiddleware, totalRatings)
  .get("/getAll", getAllProduct)
  .put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct)
  .delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);

export default router;

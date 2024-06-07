import express from "express";
import {
  addTopProducts,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getTopProducts,
  totalRatings,
  updateProduct,
  updateTopProductPosition,
  uploadImage,
} from "../controller/productController.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
//import { uploadPhoto } from "../middlewares/uploadImages.js";
import { upload } from "../middlewares/testingMiddleware.js";

const router = express.Router();
router
  // .post("/", authMiddleware, isAdmin, createProduct)
  // .put("/wishlist", authMiddleware, addToWishList)
  // .get("/:id", getProduct)
  // .get("/", getAllProduct)
  // .put("/:id", authMiddleware, isAdmin, updateProduct)
  // .delete("/:id", authMiddleware, isAdmin, deleteProduct);
  // .post("/create-product", authMiddleware, isAdmin, createProduct)

  .post("/create-product", upload.array("images", 10), createProduct)
  .get("/get/:id", getProduct)
  .put("/top-products", authMiddleware, addTopProducts)
  .put(
    "/change-product-positon",
    authMiddleware,
    isAdmin,
    updateTopProductPosition
  )
  .put("/upload-singleImage/:id", upload.single("images"), uploadImage)
  .get("/top-product-list", getTopProducts)
  .put("/ratings", authMiddleware, totalRatings)
  .get("/getAll", getAllProduct)
  .put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct)
  .delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);

export default router;

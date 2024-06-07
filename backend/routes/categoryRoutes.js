import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchSingleCategory,
  fetchAllCategory,
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from "../controller/categoryController.js";
import { upload } from "../middlewares/testingMiddleware.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .post(
    "/create-category",
    authMiddleware,
    isAdmin,
    upload.single("images"),
    createCategory
  )
  .put("/update-category/:id", authMiddleware, isAdmin, updateCategory)
  .get("/fetchSingleCategory/:identifier", fetchSingleCategory)
  // .get("/fetchSingleCategory/:name", fetchSingleCategory)
  .delete("/deleteCategory/:id", authMiddleware, isAdmin, deleteCategory)
  .get("/getAll", fetchAllCategory)

  .post("/subcategory", createSubCategory)
  .get("/subcategories", getSubCategories)
  .put("/subcategory/:id", updateSubCategory)
  .delete("/subcategory/:id", deleteSubCategory);

export default router;

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
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .post("/create-category", authMiddleware, isAdmin, createCategory)
  .put("/update-category/:id", authMiddleware, isAdmin, updateCategory)
  .get(
    "/fetchSingleCategory/:id",
    authMiddleware,
    isAdmin,
    fetchSingleCategory
  )
  .delete("/deleteCategory/:id", authMiddleware, isAdmin, deleteCategory)
  .get("/getAll", fetchAllCategory)

  .post('/subcategory', createSubCategory)
  .get('/subcategories', getSubCategories)
  .put('/subcategory/:id', updateSubCategory)
  .delete('/subcategory/:id', deleteSubCategory)

  export default router;

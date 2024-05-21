import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchSingleCategory,
  fetchAllCategory,
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
  .delete("/deleteCategpry/:id", authMiddleware, isAdmin, deleteCategory)
  .get("/getAll", fetchAllCategory);

  export default router;

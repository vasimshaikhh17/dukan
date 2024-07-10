import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchSingleCategory,
  fetchAllCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  removeSubCategoryFromList,
  categoryById,
  getSubCategories,
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
  .put("/update/:id", authMiddleware, isAdmin,  upload.single("images"), updateCategory)
  .get("/fetchSingleCategory/:identifier", fetchSingleCategory)
  // .get("/fetchSingleCategory/:name", fetchSingleCategory)
  .get("/:id",categoryById)
  .delete("/deleteCategory/:id", authMiddleware, isAdmin, deleteCategory)
  .get("/getAll", fetchAllCategory)
  .get("/subcategories", getSubCategories)

  .post("/subcategory",
    authMiddleware,
    isAdmin,
    upload.single("images"),
    createSubCategory
  )
  .put("/subcategory/:id", authMiddleware,
    isAdmin,
    upload.single("images"), updateSubCategory)
  .delete("/subcategory/:id", deleteSubCategory)
  .post("/remove-subcategory-from-list", authMiddleware, isAdmin, removeSubCategoryFromList);


export default router;

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
  removeSubCategoryFromList,
  categoryById,
  addSubCategoriesToCategory,
  getUnassignedSubCategories,
} from "../controller/categoryController.js";
import { upload } from "../middlewares/testingMiddleware.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .get("/getAll", fetchAllCategory)
  .get("/subcategories", getSubCategories)
  .get("/fetchSingleCategory/:identifier", fetchSingleCategory)
  .get("/unassigned-subcategories", getUnassignedSubCategories)
  .get("/:id",categoryById)
  .post(
    "/create-category",
    authMiddleware,
    isAdmin,
    upload.single("images"),
    createCategory
  )
  .post("/subcategory",
    authMiddleware,
    isAdmin,
    upload.single("images"),
    createSubCategory
  )
  .post("/remove-subcategory-from-list", authMiddleware, isAdmin, removeSubCategoryFromList)
  .put("/update/:id", authMiddleware, isAdmin,  upload.single("images"), updateCategory)
  .put("/subcategory/:id", authMiddleware,
    isAdmin,
    upload.single("images"), updateSubCategory)
  .delete("/deleteCategory/:id", authMiddleware, isAdmin, deleteCategory)
  .delete("/subcategory/:id", deleteSubCategory)
  .post("/add_sub_categories_to_category/:categoryId",addSubCategoriesToCategory)

export default router;

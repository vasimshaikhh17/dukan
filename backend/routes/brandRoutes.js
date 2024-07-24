import express from "express";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  fetchSingleBrand,
  fetchAllBrand,
} from"../controller/brandController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/testingMiddleware.js";
const router = express.Router();

router
.post("/create",
  authMiddleware,
  isAdmin,
  upload.single("images"),
  createBrand
  )  
.put("/update-brand/:id", authMiddleware,
  isAdmin,
  upload.single("images"), updateBrand)
  .get("/fetchSingleBrand/:identifier", authMiddleware, isAdmin, fetchSingleBrand)
  .delete("/deleteBrand/:id", authMiddleware, isAdmin, deleteBrand)
  .get("/getAll", fetchAllBrand);

  export default router;

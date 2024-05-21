import express from "express";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  fetchSingleBrand,
  fetchAllBrand,
} from"../controller/brandController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .post("/create-category", authMiddleware, isAdmin, createBrand)
  .put("/update-category/:id", authMiddleware, isAdmin, updateBrand)
  .get("/fetchSingleCategory/:id", authMiddleware, isAdmin, fetchSingleBrand)
  .delete("/deleteCategpry/:id", authMiddleware, isAdmin, deleteBrand)
  .get("/getAll", fetchAllBrand);

  export default router;

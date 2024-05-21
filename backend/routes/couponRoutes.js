import express from "express";
import {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCounpon,
} from "../controller/couponController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .post("/couponCreate", authMiddleware, isAdmin, createCoupon)
  .get("/getAll", authMiddleware, isAdmin, getAllCoupon)
  .put("/updateCounpon/:id", authMiddleware, isAdmin, updateCoupon)
  .delete("/:id", deleteCounpon);

export default router;

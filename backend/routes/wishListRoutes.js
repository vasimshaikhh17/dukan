import express from "express";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

import {
  getAllWishlistsByUserId,
  addToWishList,
} from "../controller/wishList.js";

const router = express.Router();
router
  .get("/:userId", authMiddleware, getAllWishlistsByUserId)
  .put("/getWishlist", authMiddleware, addToWishList);

export default router;

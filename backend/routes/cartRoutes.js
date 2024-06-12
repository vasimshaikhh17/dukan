import express from "express";
import { addItemToCart, removeItemFromCart, getCart, getUserCart } from "../controller/cartController.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
.post("/add", authMiddleware, addItemToCart)
.post("/remove", authMiddleware, removeItemFromCart)
.get("/", authMiddleware, getCart)
.get("/:userId", authMiddleware,isAdmin, getUserCart)

export default router;
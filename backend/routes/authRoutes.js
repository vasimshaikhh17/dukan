import express from "express";
import {
  blockUser,
  createUser,
  deleteAUser,
  forgotPasswordToken,
  getAUser,
  getAllUser,
  handleRefreshToken,
  loginUserctrl,
  logout,
  resetPassword,
  unBlockUser,
  updateAUser,
  updatePassword,
  getWishList,
  userCart,
  getUserCart,
  emtyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  saveUserAddress,
} from "../controller/userController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .post("/register", createUser)
  .post("/forgot-password-token", forgotPasswordToken)
  .post("/cart", authMiddleware, userCart)
  .post("/wishList", authMiddleware, getWishList)
  .post("/cash-order", authMiddleware, createOrder)
  .post("/cart/apply-coupon", authMiddleware, applyCoupon)
  .put("/reset-password/:token", resetPassword)
  .put("/password", authMiddleware, updatePassword)
  .post("/login", loginUserctrl)
  .get("/all-users", getAllUser)
  .get("/get-orders", authMiddleware, getOrders)
  .get("/getUserCart", authMiddleware, getUserCart)
  .get("/:id", authMiddleware, isAdmin, getAUser)
  .get("/refresh", handleRefreshToken)
  .get("/logout", logout)
  .delete("/:id",authMiddleware, isAdmin, deleteAUser)
  .delete("/empty-cart", authMiddleware, emtyCart)
  .put(
    "/order/update-order-status/:id",
    authMiddleware,
    isAdmin,
    updateOrderStatus
  )
  .put("/edit-user", authMiddleware, updateAUser)
  .put("/save-address", authMiddleware, saveUserAddress)
  .put("/block-user/:id", authMiddleware, isAdmin, blockUser)
  .put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

export default router;

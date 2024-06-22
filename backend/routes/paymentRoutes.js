import express from "express";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
import { stripePayment } from "../controller/paymentgateway.js";

const router = express.Router();

router
.post("/stripe-payment", authMiddleware, stripePayment)


export default router;
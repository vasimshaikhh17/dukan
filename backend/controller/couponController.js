import { Coupon } from "../model/coupanModel.js";
//import { User } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";

// Create Coupon
export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.json(coupon);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A Coupon with this slug already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

//Get All Coupons
export const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Coupon
export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const coupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(coupon);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A Coupon with this slug already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Delete the Coupon
export const deleteCounpon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

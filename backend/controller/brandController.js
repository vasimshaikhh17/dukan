import { Brand } from "../model/brandModels.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";

//Create Category Products
export const createBrand = asyncHandler(async (req, res) => {
  try {
    const categoryCreate = await Brand.create(req.body);
    res.json(categoryCreate);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

//Brand

//Update the ProductsCategory
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error:
          "Duplicate key error: A Brand Update with this slug already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

//Delete the ProductsCategory
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error("Error in Delete Product API!");
  }
});

//Fetch Single Product Category
export const fetchSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const getBrand = await Brand.findById(id);
    res.json(getBrand);
  } catch (error) {
    throw new Error("Single Category API!");
  }
});

// Fetch All Products Category
export const fetchAllBrand = asyncHandler(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error("Error in Get All Category API!");
  }
});

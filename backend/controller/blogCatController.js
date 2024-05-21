import { Blogcategory } from "../model/blogCatModels.js";
//import { User } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";

//Create Category Products
export const createCategory = asyncHandler(async (req, res) => {
  try {
    const categoryCreate = await Blogcategory.create(req.body);
    res.json(categoryCreate);
  } catch (error) {
    throw new Error("Error in Create Category API!");
  }
});

//Update the ProductsCategory
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateProductCategory = await Blogcategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProductCategory);
  } catch (error) {
    throw new Error("Error In Update Catgory API!");
  }
});

//Delete the ProductsCategory
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteProductCategory = await Blogcategory.findByIdAndDelete(id);
    res.json(deleteProductCategory);
  } catch (error) {
    throw new Error("Error in Delete Product API!");
  }
});

//Fetch Single Product Category
export const fetchSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategory = await Blogcategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error("Single Category API!");
  }
});

// Fetch All Products Category
export const fetchAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Blogcategory.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error("Error in Get All Category API!");
  }
});

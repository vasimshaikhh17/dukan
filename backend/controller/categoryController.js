import { errorHandler } from "../middlewares/errorHandler.js";
import { Category } from "../model/categoryModels.js";
import { Product } from "../model/productModel.js";
import { SubCategory } from "../model/subCategoryModel.js";
import { User } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
import cloudinary from "cloudinary";
import fs from "fs";
import mongoose from "mongoose";


export const createCategory = async (req, res, next) => {
  const { title, subCategoryIds } = req.body;
  try {
    // Check for duplicate title
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res.status(400).json({
        error: "A category with this title already exists.",
      });
    }

    // Ensure subCategoryIds is an array
    let parsedSubCategoryIds = [];
    if (subCategoryIds) {
      parsedSubCategoryIds = JSON.parse(subCategoryIds);
    }

    // Check for duplicate subcategory IDs within the provided array
    const uniqueSubCategoryIds = [...new Set(parsedSubCategoryIds)];
    if (uniqueSubCategoryIds.length !== parsedSubCategoryIds.length) {
      return res.status(400).json({
        error: "Duplicate subcategory IDs are not allowed.",
      });
    }

    // Check if subcategory IDs already exist in any other category
    const existingSubCategories = await Category.find({
      sub_category: { $in: uniqueSubCategoryIds },
    });
    if (existingSubCategories.length > 0) {
      return res.status(400).json({
        error: "One or more subcategory IDs already exist in another category.",
      });
    }

    // Upload image to Cloudinary
    const uploadResults = await cloudinary.uploader.upload(req.file.path);

    // Create new category
    const categoryCreates = new Category({
      title,
      imageUrl: uploadResults.secure_url,
      sub_category: uniqueSubCategoryIds,
    });
    await categoryCreates.save();

    // Remove file from local storage
    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else console.log("File or Images Successfully Deleted!");
    });

    res.json(categoryCreates);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A product with this Create category already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const createSubCategory = async (req, res, next) => {
  const { title } = req.body;
  try {
    // Check for duplicate title
    const existingCategory = await SubCategory.findOne({ title: title });
    if (existingCategory) {
      return res.status(400).json({
        error: "A Subcategory with this title already exists.",
      });
    }

    // Upload image to Cloudinary
    const uploadResults = await cloudinary.uploader.upload(req.file.path);

    // Create new category
    const categoryCreates = new SubCategory({
      title: title,
      image: uploadResults.secure_url,
    });
    await categoryCreates.save();

    // Remove file from local storage
    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else console.log("File or Images Successfully Deleted!");
    });

    res.json(categoryCreates);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A product with this Create category already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const getSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);
  } catch (error) {
    console.log(error);
    next(new Error("Error in Get SubCategories API!"));
  }
};

export const updateSubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    // Check if SubCategory exists
    let subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    // Check for duplicate title (if title is being updated)
    if (title !== subCategory.title) {
      const existingSubCategory = await SubCategory.findOne({ title });
      if (existingSubCategory) {
        return res.status(400).json({
          error: "A Subcategory with this title already exists.",
        });
      }
    }

    // Upload new image to Cloudinary (if provided)
    let imageUrl = subCategory.image;
    if (req.file) {
      const uploadResults = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResults.secure_url;

      // Remove old image from Cloudinary (if updating image)
      if (subCategory.imagePublicId) {
        await cloudinary.uploader.destroy(subCategory.imagePublicId);
      }

      // Remove old image file from local storage (if updating image)
      if (subCategory.imagePath) {
        fs.unlink(subCategory.imagePath, function (err) {
          if (err) console.log(err);
          else console.log("Old Image Successfully Deleted!");
        });
      }
    }

    // Update SubCategory title and image URL
    subCategory.title = title;
    subCategory.image = imageUrl;

    // Save updated SubCategory
    await subCategory.save();

    // Remove file from local storage (if new image uploaded)
    if (req.file) {
      fs.unlink(req.file.path, function (err) {
        if (err) console.log(err);
        else console.log("New Image File Successfully Deleted!");
      });
    }

    res.json(subCategory);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A Subcategory with this title already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const deleteSubCategory = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
      res.status(404).json({ message: "SubCategory not found!" });
    } else {
      res.json({ message: "SubCategory deleted successfully!" });
    }
  } catch (error) {
    next(new Error("Error in Delete SubCategory API!"));
  }
};

export const approvalList = async (req, res, next) => {
  try {
    // Fetch the admin user
    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      return res.status(404).json({ success: false, msg: "Admin not found" });
    }

    // Check if the requester is an admin
    const isAdmin = admin._id.toString() === req.body.params;

    // Fetch all categories
    const categories = await Category.find();

    // Log the fetched data
    // console.log(categories);

    // Respond with the fetched data
    if (isAdmin) {
      return res.status(200).json({
        success: true,
        msg: "Admin data fetched successfully",
        data: categories,
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "Data fetched successfully",
        data: categories,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    // Check if SubCategory exists
    let category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check for duplicate title (if title is being updated)
    if (title !== category.title) {
      const existingCategory = await Category.findOne({ title });
      if (existingCategory) {
        return res.status(400).json({
          error: "A Category with this title already exists.",
        });
      }
    }

    // Upload new image to Cloudinary (if provided)
    let imageUrl = category.image;
    if (req.file) {
      const uploadResults = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResults.secure_url;

      // Remove old image from Cloudinary (if updating image)
      if (category.imagePublicId) {
        await cloudinary.uploader.destroy(category.imagePublicId);
      }

      // Remove old image file from local storage (if updating image)
      if (category.imagePath) {
        fs.unlink(category.imagePath, function (err) {
          if (err) console.log(err);
          else console.log("Old Image Successfully Deleted!");
        });
      }
    }

    // Update category title and image URL
    category.title = title;
    category.image = imageUrl;

    // Save updated category
    await category.save();

    // Remove file from local storage (if new image uploaded)
    if (req.file) {
      fs.unlink(req.file.path, function (err) {
        if (err) console.log(err);
        else console.log("New Image File Successfully Deleted!");
      });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A Subcategory with this title already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

//Delete the ProductsCategory
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  // validateMongoId(id);
  try {
    const deleteProductCategory = await Category.findByIdAndDelete(id);
    res.json(deleteProductCategory);
  } catch (error) {
    throw new Error("Error in Delete Product API!");
  }
});

//Fetch Single Product Category
export const fetchSingleCategory = asyncHandler(async (req, res) => {
  const { identifier } = req.params;

  try {
    // Validate the categoryId
    let categoryname = await Category.find({ title: identifier });

    let categoryby;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      categoryby = identifier;
    } else if (categoryname) {
      let categoryName = await Category.find({ title: identifier });
      categoryby = await categoryName[0]?._id;
      // console.log(categoryby, "categoryname");
      // console.log(categoryName, "categoryname");
    } else {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    // Fetch products based on the categoryId

    const products = await Product.find({ category: categoryby });
    // const products = await Product.find({ categoryId }).populate("category");
    if (products.length > 0) {
      res.json({ msg: "success", data: products });
    } else {
      res
        .status(404)
        .json({ message: "No products found for the given category ID" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const categoryById = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  try{
    const category = await Category.findById(id).populate("sub_category"); 
    if(!category){
      return res.status(404).json({error:"Category not Found"})
    }
    res.json(category)
  }catch(error){
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})

// Fetch All Products Category
export const fetchAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find().populate("sub_category");
    res.json(getAllCategory);
  } catch (error) {
    throw new Error("Error in Get All Category API!");
  }
});

export const removeSubCategoryFromList = async (req, res) => {
  const { categoryId, subCategoryId } = req.body;

  try {
    // Find the category and update it by pulling the subCategoryId from the sub_category array
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $pull: { sub_category: subCategoryId } },
      { new: true }
    ).populate("sub_category");

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
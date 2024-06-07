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
// export const createCategory = async (req, res, next) => {
//   const { name, icon, color, createdBy } = req.body;

//   if (!name || !color || !icon || !createdBy) {
//     return next(new errorHandler("Please fill in all fields", 400));
//   }

//   try {
//     const alreadyExist = await Category.findOne({ name });
//     if (alreadyExist) {
//       return next(new errorHandler("Category already exists", 400));
//     }

//     const existingUser = await User.findOne({ _id: createdBy });
//     if (!existingUser) {
//       return next(new errorHandler("User doesn't exist", 400));
//     }

//     const admin = await User.findOne({ role: "admin" });
//     const createdByAdmin = admin._id === createdBy;

//     const createdCategory = await Category.create({
//       name,
//       icon,
//       color,
//       createdBy,
//       createdByAdmin: createdByAdmin ? true : false,
//     });

//     if (createdCategory) {
//       return res.status(200).json({
//         success: true,
//         msg: "Your category has been submitted successfully. It is awaiting approval.",
//       });
//     }
//   } catch (error) {
//     return next(new errorHandler(error.message, 500));
//   }
// };

export const createCategory = async (req, res, next) => {
  const { category, title } = req.body;
  try {
    //Starts
    // const uploadResults = await Promise.all(
    //   req.files.map((file) => cloudinary.uploader.upload(file.path))
    // );

    const uploadResults = await cloudinary.uploader.upload(req.file.path);

    // const imageUrls = uploadResults.map(
    //   (uploadResult) => uploadResult.secure_url
    // );
    console.log(uploadResults, "uploadResults");
    const categoryCreates = await Category.create({
      category: category,
      title: title,
      imageUrl: uploadResults?.secure_url,
    });
    await categoryCreates.save();
    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else console.log("File or Images Successfully Deleted!");
    });
    console.log(categoryCreates);
    res.json(categoryCreates);
  } catch (error) {
    // throw new Error(error);
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        error:
          "Duplicate key error: A product with this Create category already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const createSubCategory = async (req, res, next) => {
  const { category } = req.body;
  try {
    const subCategory = await SubCategory.create({ category });
    res.json(subCategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error:
          "Duplicate key error: A product with this sub-category already exists.",
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
    next(new Error("Error in Get SubCategories API!"));
  }
};

export const updateSubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;
  validateMongoDbId(id);
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    if (!subCategory) {
      res.status(404).json({ message: "SubCategory not found!" });
    } else {
      res.json(subCategory);
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A product with this slug already exists.",
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
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  //validateMongoId(id);
  try {
    const updateProductCategory = await Category.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProductCategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A product with this slug already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});
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

// Fetch All Products Category
export const fetchAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error("Error in Get All Category API!");
  }
});

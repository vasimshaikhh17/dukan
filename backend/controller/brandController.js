import { Brand } from "../model/brandModels.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
import fs from "fs";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { Product } from "../model/productModel.js";

//Create Category Products

export const createBrand = async (req, res) => {
  const { name } = req.body;
  try {
    // Check for duplicate name
    const existingBrand = await Brand.findOne({ name: name });
    if (existingBrand) {
      return res.status(400).json({
        error: "A Brand with this name already exists.",
      });
    }
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded.",
        });
      }
      console.log("File received:", req.file);  

    // Upload image to Cloudinary
    const uploadResults = await cloudinary.uploader.upload(req.file.path);

    // Create new Brand
    const BrandCreates = new Brand({
      name: name,
      image: uploadResults.secure_url,
    });
    await BrandCreates.save();

    // Remove file from local storage
    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else console.log("File or Images Successfully Deleted!");
    });

    res.json(BrandCreates);
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

//Brand

//Update the ProductsCategory
// export const updateBrand = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.json(updateBrand);
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).json({
//         error:
//           "Duplicate key error: A Brand Update with this slug already exists.",
//       });
//     } else {
//       res.status(400).json({ error: error.message });
//     }
//   }
// });

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // Check if SubCategory exists
    let brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ error: "brand not found" });
    }

    // Check for duplicate title (if title is being updated)
    if (name !== brand.name) {
      const existingBrand = await Brand.findOne({ name });
      if (existingBrand) {
        return res.status(400).json({
          error: "A Brand with this name already exists.",
        });
      }
    }

    // Upload new image to Cloudinary (if provided)
    let imageUrl = brand.image;
    if (req.file) {
      const uploadResults = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResults.secure_url;

      // Remove old image from Cloudinary (if updating image)
      if (brand.imagePublicId) {
        await cloudinary.uploader.destroy(brand.imagePublicId);
      }

      // Remove old image file from local storage (if updating image)
      if (brand.imagePath) {
        fs.unlink(brand.imagePath, function (err) {
          if (err) console.log(err);
          else console.log("Old Image Successfully Deleted!");
        });
      }
    }

    // Update brand name and image URL
    brand.name = name;
    brand.image = imageUrl;

    // Save updated brand
    await brand.save();

    // Remove file from local storage (if new image uploaded)
    if (req.file) {
      fs.unlink(req.file.path, function (err) {
        if (err) console.log(err);
        else console.log("New Image File Successfully Deleted!");
      });
    }

    res.json(brand);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A Brand with this name already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

//Delete the ProductsCategory
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    await Product.updateMany({}, { $pull: { brand: id } });
    console.log(`Brand with ID ${id} deleted and removed from all Products`);
    res.json({msg:"Brand Deleted Successfully",brand:deleteBrand?.name});
  } catch (error) {
    throw new Error("Error in Delete Product API!");
  }
});

//Fetch Single Product Category
// export const fetchSingleBrand = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const getBrand = await Brand.findById(id);
//     res.json(getBrand);
//   } catch (error) {
//     throw new Error("Single Category API!");
//   }
// });

export const fetchSingleBrand = asyncHandler(async (req, res) => {
  const { identifier } = req.params;

  try {
    // Validate the categoryId
    let brandname = await Brand.find({ name: identifier });

    let brandBy;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      brandBy = identifier;
    } else if (brandname) {
      let categoryName = await Brand.find({ name: identifier });
      brandBy = await categoryName[0]?._id;
     
    } else {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    // Fetch products based on the categoryId

    const brand = await Brand.find({ _id: brandBy });
    if (brand.length > 0) {
      res.json({ msg: "success", data: brand });
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
export const fetchAllBrand = asyncHandler(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error("Error in Get All Category API!");
  }
});

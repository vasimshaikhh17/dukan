import asyncHandler from "express-async-handler";
import { Product } from "../model/productModel.js";
import { User } from "../model/userModel.js";
import { TopProducts } from "../model/topProducts.js";
import slugify from "slugify";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
//import { cloudinaryuploadImg } from "../utils/cloudinary.js";
import fs from "fs";
import { cloudinaryuploadImg } from "../utils/cloudinary.js";
import cloudinary from "cloudinary";
import { Wishlist } from "../model/wishList.js";
import mongoose from "mongoose";
import { Category } from "../model/categoryModels.js";
import { SubCategory } from "../model/subCategoryModel.js";
import { Cart } from "../model/cartModel.js";

// export const createProduct = asyncHandler(async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     category,
//     brand,
//     quantity,
//     sub_category,
//     sold,
//     color,
//     tags,
//   } = req.body;

//   // let slug = "";
//   //   if (title) {
//   //     slug = slugify(title);
//   //   }

//   try {
//     if (req.body.title) {
//       req.body.slug = slugify(req.body.title);
//     }
//     let slug = "";
//     if (title) {
//       slug = slugify(title);
//     }

//     //Starts
//     const uploadResults = await Promise.all(
//       req.files.map((file) => cloudinary.uploader.upload(file.path))
//     );

//     const imageUrls = uploadResults.map(
//       (uploadResult) => uploadResult.secure_url
//     );

//     const newImage = new Product({
//       title: title,
//       images: imageUrls,
//       description: description || "",
//       price: price,
//       slug: slug,
//       brand: brand,
//       quantity: quantity,
//       sub_category: sub_category,
//       color: color,
//       tags: tags,
//       category: category,
//       sold: sold,
//     });

//     await newImage.save();

//     req.files.forEach((file) => {
//       fs.unlink(file.path, function (err) {
//         if (err) console.log(err);
//         else console.log("\nFile Successfully Deleted");
//       });
//     });
//     //ends

//     res.json({
//       title: title,
//       images: imageUrls,
//       description: description || "",
//       price: price,
//       brand: brand,
//       quantity: quantity,
//       sub_category: sub_category,
//       color: color,
//       tags: tags,
//       category: category,
//       sold: sold,
//       message: "Successfully uploaded",
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });


export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    brand,
    quantity, // This will be parsed as JSON
    sub_category,
    sold,
    color,
    tags,
  } = req.body;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    let slug = "";
    if (title) {
      slug = slugify(title);
    }

    // Parse the quantity field
    let parsedQuantity;
    try {
      parsedQuantity = JSON.parse(quantity);
      // console.log("Parsed Quantity:", parsedQuantity);
    } catch (error) {
      console.error("Failed to parse quantity:", error);
    }

    // Validate the parsed quantity
       // Upload images to cloudinary
    const uploadResults = await Promise.all(
      req.files.map((file) => cloudinary.uploader.upload(file.path))
    );

    const imageUrls = uploadResults.map(
      (uploadResult) => uploadResult.secure_url
    );
    const newProduct = new Product({
      title: title,
      images: imageUrls,
      description: description || "",
      price: price,
      slug: slug,
      brand: brand,
      quantity: parsedQuantity, // Use the parsed quantity
      sub_category: sub_category,
      color: color,
      tags: tags,
      category: category,
      sold: sold,
    });

    await newProduct.save();

    // Delete the uploaded files after they have been uploaded to cloudinary
    req.files.forEach((file) => {
      fs.unlink(file.path, function (err) {
        if (err) console.log(err);
        else console.log("\nFile Successfully Deleted");
      });
    });

    res.json({
      title: title,
      images: imageUrls,
      description: description || "",
      price: price,
      brand: brand,
      quantity: parsedQuantity,
      sub_category: sub_category,
      color: color,
      tags: tags,
      category: category,
      sold: sold,
      message: "Successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload product", error });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
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

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id).populate('category').populate('sub_category').populate('brand')
    res.json(findProduct);
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

// export const getAllProduct = asyncHandler(async (req, res) => {
//   // console.log(req.query);
//   try {
//     //Filtering
//     const queryObj = { ...req.query };
//     const excludeFields = ["page", "sort", "limit", "fields"];
//     excludeFields.forEach((el) => delete queryObj[el]);
//     let queryString = JSON.stringify(queryObj);
//     queryString = queryString.replace(
//       /\b(gte|gt|lte|lt)\b/g,
//       (match) => `$${match}`
//     );
//     let query = Product.find(JSON.parse(queryString));

//     // Sorting
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }
//     //Limiting the Fields
//     if (req.query.fields) {
//       const fields = req.query.fields.split(",").join(" ");
//       query = query.select(fields);
//     } else {
//       query = query.select("-__v");
//     }
//     //pagination

//     const page = req.query.page;
//     const limit = req.query.limit;
//     const skip = (page - 1) * limit;
//     // console.log(page,limit,skip);
//     query = query.skip(skip).limit(limit);
//     if (req.query.page) {
//       const productCount = await Product.countDocuments();
//       if (skip >= productCount) throw new Error("This page does not Exist");
//     }

//     const product = await query;
//     res.json(product);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle category filtering if parameter exists
    if (req.query.category) {
      const category = await Category.findOne({ title: req.query.category });
      if (category) {
        queryObj.category = category._id;
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    // Handle subcategory filtering if parameter exists
    if (req.query.sub_category) {
      const subCategory = await SubCategory.findOne({ sub_category: req.query.sub_category });
      // console.log('SubCategory:', subCategory);
      if (subCategory) {
        queryObj.sub_category = subCategory._id;
      } else {
        return res.status(404).json({ message: "Subcategory not found" });
      }
    }

    // Construct the query
    const queryString = JSON.stringify(queryObj);
    let query = Product.find(JSON.parse(queryString))
    // console.log(query,'query')
    // Sorting, Field Selection, Pagination - Remaining code should be here
    // ...
    query.populate('category').populate('sub_category').populate('brand')
    // console.log(products,'products')
    const product = await query;
    // console.log(product[0]?.brand, 'brand of the first product'); // Should log the brand of the first product if available

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

export const searchProducts = asyncHandler(async (req, res) => {
  try {
    const { search, sort, page, limit, fields } = req.query;

    if (!search) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Create a regex for case-insensitive partial match for string fields
    const regex = new RegExp(search, 'i');

    // Try to convert search term to a number for numeric fields
    const searchNumber = parseFloat(search);

    // Construct the query object
    const queryObj = {
      $or: [
        { title: regex },
        // { category: regex },
        // { sub_category: regex },
        { color: regex },
        { brand: regex },
        { description: regex },
        ...(isNaN(searchNumber) ? [] : [{ price: searchNumber }, { 'ratings.star': searchNumber }]),
      ]
    };

    let query = Product.find(queryObj);

    // Sorting
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting the fields
    if (fields) {
      const selectedFields = fields.split(',').join(' ');
      query = query.select(selectedFields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const pageNo = parseInt(page, 10) || 1;
    const limitNo = parseInt(limit, 10) || 10;
    const skip = (pageNo - 1) * limitNo;

    query = query.skip(skip).limit(limitNo);

    const products = await query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
   // Remove the Product from Cart
    await Cart.updateMany({}, { $pull: { products: { product: id } } });
    await Wishlist.updateMany({}, { $pull: { products: id } });
    await TopProducts.updateMany({}, { $pull: { products: id } });
    console.log(`Product with ID ${id} deleted and removed from everywhere`);

    res.json({ message: 'Product deleted successfully!' });
  } catch (error) {
    console.error('Error in Delete Product API:', error);
    res.status(500).json({ message: 'Error in Delete Product API!' });
  }
};

// Add to WishList Functionality
// export const addToWishList = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { prodId } = req.body;
//   validateMongoDbId(_id);
//   // console.log(prodId);
//   try {
//     const user = await User.findById(_id);
//     const alreadyAdded = await user.wishList.find(
//       (id) => id.toString() === prodId
//     );
//     if (alreadyAdded) {
//       let user = await User.findByIdAndUpdate(
//         _id,
//         {
//           $pull: { wishList: prodId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(user);
//     } else {
//       let user = await User.findByIdAndUpdate(
//         _id,
//         {
//           $push: { wishList: prodId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(user);
//     }
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).json({
//         error: "Duplicate key error: A product with this slug already exists.",
//       });
//     } else {
//       res.status(400).json({ error: error.message });
//     }
//   }
// });



// export const addToWishList = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { prodId } = req.body;
//   validateMongoDbId(_id);
//   validateMongoDbId(prodId);
//   console.log(prodId);
//   try {
//     const user = await User.findById(_id);
//     const alreadyAdded = user.wishList.find((_id) => _id.toString() === prodId);
//     if (alreadyAdded) {
//       let user = await User.findByIdAndUpdate(
//         _id,
//         {
//           $pull: { wishList: prodId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.json({
//         msg: "Product removed Successfully from wishlist",
//       });
//     } else {
//       let user = await User.findByIdAndUpdate(
//         _id,
//         {
//           $push: { wishList: prodId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.json({
//         msg: "Product added Successfully to wishlist",
//       });
//     }
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).json({
//         error: "Duplicate key error: A product with this slug already exists.",
//       });
//     } else {
//       res.status(400).json({ error: error.message });
//     }
//   }
// });

//Ratings Functionality
export const totalRatings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { stars, prodId, comment } = req.body;
  // console.log(stars, prodId, comment);
  try {
    const prodcut = await Product.findById(prodId);
    let alredyRating = prodcut.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alredyRating) {
      const updatedRatings = await Product.findOne(
        {
          ratings: { $elemMatch: alredyRating },
        },
        { $set: { "ratings.$.stars": stars, "ratings.$.comment": comment } },
        { new: true }
      );
      res.json(updatedRatings);
    } else {
      const userRating = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: { ratings: { stars: stars, comment: comment, postedby: _id } },
        },
        { new: true }
      );
      res.json(userRating);
    }
    const getAllRatings = await Product.findById(prodId);
    let fullRatings = getAllRatings.ratings.length;
    let ratingSums = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSums / fullRatings);
    const finalRating = await Product.findByIdAndUpdate(
      prodId,
      {
        fullRatings: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(finalRating);
  } catch (error) {
    throw new Error("Error in Ratings API!");
  }
});

// Uoload File and Images Functionlity
export const uploadImage = asyncHandler(async (req, res) => {
  // console.log(req.files);
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    const newImage = new Product({ images: uploadResult.secure_url });
    await newImage.save();
    console.log(newImage);
    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else console.log("File Successfully Deleted");
    });
    const findProduct = await Product.findByIdAndUpdate(
      id,
      { images: uploadResult.secure_url },
      { new: true }
    );
    res.json(findProduct, newImage);
  } catch (error) {
    console.log(error);
  }
});

// Add or remove top products for a user
export const addTopProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  validateMongoDbId(_id);

  try {
    // Find the user's top products list
    let topProducts = await TopProducts.findOne({ user: _id });

    if (!topProducts) {
      // If the top products list doesn't exist, create a new one
      topProducts = new TopProducts({ user: _id, topProducts: [] });
    }

    const alreadyAdded = topProducts.topProducts.find(
      (id) => id.toString() === prodId
    );

    if (alreadyAdded) {
      // Remove the product from the top products list
      topProducts.topProducts = topProducts.topProducts.filter(
        (id) => id.toString() !== prodId
      );
    } else {
      // Add the product to the top products list
      topProducts.topProducts.push(prodId);
    }

    await topProducts.save();
    res.json(topProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Get Top Producsts!
export const getTopProducts = asyncHandler(async (req, res) => {
  let topProducts = await TopProducts.find();
  try {
    if (topProducts[0].topProducts) {
      res.json({ productId: topProducts[0].topProducts });
    }
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
  // console.log(topProducts)
});

//Update Top Products
export const updateTopProductPosition = asyncHandler(async (req, res) => {
  const { userId, prodId, newPosition } = req.body;
  validateMongoDbId(userId);

  try {
    let topProducts = await TopProducts.findOne({ user: userId });
    if (!topProducts) {
      return res.status(404).send("Top products list not found");
    }

    const productIdObj = new mongoose.Types.ObjectId(prodId);
    const currentIndex = topProducts.topProducts.findIndex((id) =>
      id.equals(productIdObj)
    );

    if (currentIndex === -1) {
      return res.status(404).send("Product not found in top products");
    }

    if (newPosition < 0 || newPosition >= topProducts.topProducts.length) {
      return res.status(400).send("Invalid new position");
    }

    const [movedProduct] = topProducts.topProducts.splice(currentIndex, 1);
    topProducts.topProducts.splice(newPosition, 0, movedProduct);

    await topProducts.save();
    res.status(200).send(topProducts);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A product with this slug already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
    res.status(500).send("Server error");
  }
});

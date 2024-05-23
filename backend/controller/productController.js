import asyncHandler from "express-async-handler";
import { Product } from "../model/productModel.js";
import { User } from "../model/userModel.js";
import slugify from "slugify";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
import { cloudinaryuploadImg } from "../utils/cloudinary.js";
import fs from "fs";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllProduct = asyncHandler(async (req, res) => {
  // console.log(req.query);
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    let query = Product.find(JSON.parse(queryString));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //Limiting the Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    // console.log(page,limit,skip);
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This page does not Exist");
    }

    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Add to WishList Functionality
export const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  validateMongoDbId(_id);
  // console.log(prodId);
  try {
    const user = await User.findById(_id);
    const alreadyAdded = await user.wishList.find(
      (_id) => _id.toString() === prodId
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error("Error in WishList API!");
  }
});

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

  const uploader = (path) => cloudinaryuploadImg(path, "images");

  const urls = [];
  const files = req.files;
  // console.log(files, "files");
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  const findProduct = await Product.findByIdAndUpdate(id, {
    images: urls.map(
      (file) => {
        return file;
      },
      {
        new: true,
      }
    ),
  });
  res.json(findProduct);
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
    res.status(500).send("Server error");
  }
});
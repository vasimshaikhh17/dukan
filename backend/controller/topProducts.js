import asyncHandler from "express-async-handler";
import { Product } from "../model/productModel.js";
import { User } from "../model/userModel.js";
import { TopProducts } from "../model/topProducts.js";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
import mongoose from "mongoose";


// Add or remove top products for a user
// export const addTopProducts = asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     const { prodId } = req.body;
//     validateMongoDbId(_id);
  
//     try {
//       // Find the user's top products list
//       let topProducts = await TopProducts.findOne({ user: _id });
  
//       if (!topProducts) {
//         // If the top products list doesn't exist, create a new one
//         topProducts = new TopProducts({ user: _id, topProducts: [] });
//       }
  
//       const alreadyAdded = topProducts.topProducts.find(
//         (id) => id.toString() === prodId
//       );
  
//       if (alreadyAdded) {
//         // Remove the product from the top products list
//         topProducts.topProducts = topProducts.topProducts.filter(
//           (id) => id.toString() !== prodId
//         );
//       } else {
//         // Add the product to the top products list
//         topProducts.topProducts.push(prodId);
//       }
  
//       await topProducts.save();
//       res.json(topProducts);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });
export const addTopProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  validateMongoDbId(_id);
  validateMongoDbId(prodId);

  try {
    let user = await User.findById(_id).populate("topProducts");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let topProductsList = user.topProducts;

    if (!topProductsList) {
      topProductsList = new TopProducts({ user: _id, products: [] });
    }

    const productIndex = topProductsList.products.findIndex(
      (item) => item.toString() === prodId
    );

    if (productIndex !== -1) {
      // Remove product from top products list
      topProductsList.products.splice(productIndex, 1);
    } else {
      // Add product to top products list
      const product = await Product.findById(prodId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      topProductsList.products.push(new mongoose.Types.ObjectId(prodId));
    }

    await topProductsList.save();

    if (!user.topProducts) {
      user.topProducts = topProductsList._id;
      await user.save();
    }

    res.json(topProductsList);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
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
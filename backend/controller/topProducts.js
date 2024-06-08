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
  const { prodId } = req.body;
  validateMongoDbId(prodId);

  try {
    let topProductsDoc = await TopProducts.findOne();

    if (!topProductsDoc) {
      topProductsDoc = new TopProducts({ products: [] });
    }

    const productIndex = topProductsDoc.products.findIndex(
      (item) => item.toString() === prodId
    );

    if (productIndex !== -1) {
      // Remove product from top products list
      topProductsDoc.products.splice(productIndex, 1);
    } else {
      // Add product to top products list
      const product = await Product.findById(prodId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      topProductsDoc.products.push(new mongoose.Types.ObjectId(prodId));
    }

    await topProductsDoc.save();
    res.json(topProductsDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//Get Top Producsts!
export const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProductsDoc = await TopProducts.findOne().populate("products");
    if (!topProductsDoc) {
      return res.status(404).json({ error: "No top products found" });
    }

    res.json({ products: topProductsDoc.products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//Update Top Products
export const updateTopProductPosition = asyncHandler(async (req, res) => {
  const { prodId, newPosition } = req.body;
  validateMongoDbId(prodId);
  try {
    let topProductsDoc = await TopProducts.findOne();
    if (!topProductsDoc) {
      return res.status(404).send("Top products list not found");
    }

    const productIdObj = new mongoose.Types.ObjectId(prodId);
    const currentIndex = topProductsDoc.products.findIndex((id) =>
      id.equals(productIdObj)
    );

    if (currentIndex === -1) {
      return res.status(404).send("Product not found in top products");
    }

    if (newPosition < 0 || newPosition >= topProductsDoc.products.length) {
      return res.status(400).send("Invalid new position");
    }

    const [movedProduct] = topProductsDoc.products.splice(currentIndex, 1);
    topProductsDoc.products.splice(newPosition, 0, movedProduct);

    await topProductsDoc.save();
    res.status(200).send(topProductsDoc);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

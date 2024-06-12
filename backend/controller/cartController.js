import asyncHandler from "express-async-handler";
import { Cart } from "../model/cartModel.js";
import { Product } from "../model/productModel.js";

// Add item to cart
export const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity, color, size, price } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ orderby: userId });

  if (cart) {
    const itemIndex = cart.products.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.color === color &&
        item.size === size
    );
    if (itemIndex > -1) {
      cart.products[itemIndex].count += quantity;
    } else {
      cart.products.push({ product: productId, count: quantity, color, size, price });
    }
  } else {
    cart = new Cart({
      orderby: userId,
      products: [{ product: productId, count: quantity, color, size, price }],
    });
  }

  cart.cartTotal = cart.products.reduce((total, item) => total + item.price * item.count, 0);

  await cart.save();
  res.status(200).json(cart);
});

// Remove item from cart
export const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, color, size } = req.body;

  let cart = await Cart.findOne({ orderby: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.products = cart.products.filter(
    (item) =>
      !(item.product.toString() === productId && item.color === color && item.size === size)
  );

  cart.cartTotal = cart.products.reduce((total, item) => total + item.price * item.count, 0);

  await cart.save();
  res.status(200).json(cart);
});

// Get cart details
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(userId)
  const cart = await Cart.findOne({ orderby: userId }).populate("products.product");
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(cart);
});

// Get cart details admin Sidess

export const getUserCart = asyncHandler(async (req, res) => {
  const {userId} = req.params;
  console.log(userId)
  const cart = await Cart.findOne({ orderby: userId }).populate("products.product");
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json(cart);
});
import { generateToken } from "../config/jwtToken.js";
import { User } from "../model/userModel.js";
import { Product } from "../model/productModel.js";
import { Cart } from "../model/cartModel.js";
// const Coupon = require("../models/Coupon.js");
// const Order = require("../models/Order.js");
// const uniqid = require("uniqid");
import { Coupon } from "../model/coupanModel.js";

import { Order } from "../model/orderModels.js";
import uniqid from "uniqid";

import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import { sendEmail } from "./emailController.js";
import crypto from "crypto";

// Create User
export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json({ success: true, newUser, msg: "User Registered Successfully" });
  } else {
    throw new Error("User Already Exisits");
    res.json({ success: false, msg: "User Already Exisits" });
  }
});

// Login User
export const loginUserctrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if User exist or not
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      msg: "Logged in Successfully",
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credientials");
  }
  // console.log(email, password);
});

// Get All Users
export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single User
export const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    res.json({ getUser });
  } catch (error) {
    throw new Error(error);
  }
  // console.log(id, "id");
});

//Save User Address
export const saveUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateAddress = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updateAddress);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Users
export const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Handle Refresh Token
export const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//Logout Functionality
export const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Referesh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(204); //Forbiden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(204); //Forbiden
});

// Update Users
export const updateAUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Blocked Users functionality
export const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json({ message: "User Blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

//Blocked Users functionality
export const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: false }
    );
    res.json({ message: "User UnBlocked" });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Password
export const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  // console.log(user.password)
  if (password) {
    // console.log('true')
    user.password = password;

    const updatedPassword = await user.save();
    // console.log(updatedPassword,'uodated password')
    res.json(updatedPassword);
  } else {
    // console.log(false)
    res.json(user);
  }
});

// Forgot Password functionality
export const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not Found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now . <a href='http://localhost:5173/reset-password/${token}'>click here</a>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

// Reset Password Functionality
export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

// Get All WishList
export const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const findUser = await User.findById(_id).populate("wishList");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

// User Create Cart
export const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    let products = [];
    const user = await User.findById(_id);
    // Check If user Have Products in Cart
    const alreadyExit = await Cart.findOne({ orderby: user._id });
    if (alreadyExit) {
      alreadyExit.remove;
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//Get User Cart
export const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const getCart = await Cart.findOne({ orderby: _id }).populate(
      "Product.product"
    );
    // console.log(getCart);
    res.json(getCart);
  } catch (error) {
    throw new Error(error);
  }
});

// Empty Cart Functonlity
export const emtyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const findCartUser = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({
      orderby: findCartUser._id,
    });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// Apply Coupon Functonlity
export const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  // console.log(validCoupon);
  if (validCoupon === null) {
    throw new Error("Invalid Coupon ");
  }
  const user = await User.findOne({ _id });
  let { cartTotal, products } = await Cart.findOne({
    orderby: user._id,
  }).populate("Product.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

// Create Order
export const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const { COD, couponApplied } = req.body;
  try {
    if (!COD) throw new Error("Create Order Failed");
    const user = await User.findById(_id);
    let usercart = await Cart.findOne({ orderby: user._id });
    let finalAmount = 0;
    if (couponApplied && usercart.totalAfterDiscount) {
      finalAmount = usercart.totalAfterDiscount;
    } else {
      finalAmount = usercart.cartTotal;
    }
    let newOrder = await new Order({
      products: usercart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        status: "Cash on Delivery",
        amount: finalAmount,
        created: Date.now(),
        currenct: "USD",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = await usercart.Product.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    // console.log(error);
  }
});

// List The Order or Get The Orders
export const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const getUserOrders = await Order.findOne({ orderby: _id })
      .populate("Product.product")
      .exec();
    res.json(getUserOrders);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Order Status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  validateMongoDbId(id);
  try {
    const orderupdateStatus = await Order.findById(
      id,
      {
        orderStatus: status,
        paymentIntent: { status: status },
      },
      { new: true }
    );
    res.json(orderupdateStatus);
  } catch (error) {
    throw new Error(error);
  }
});

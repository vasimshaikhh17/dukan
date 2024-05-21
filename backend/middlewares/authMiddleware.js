import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
        console.log(decoded);
      }
    } catch (error) {
      throw new Error(error);
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  // console.log(req.user)
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

// class ErrorHandler extends Error {
//     constructor(message, statusCode) {
//       super(message);
//       this.statusCode = statusCode;
//     }
//   }

//   export const errorMiddleware = (err, req, res, next) => {
//     err.message = err.message || "Internal Server Error";
//     err.statusCode = err.statusCode || 500;

//     if (err.code === 11000) {
//       const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
//         err = new ErrorHandler(message, 400);
//     }
//     if (err.name === "JsonWebTokenError") {
//       const message = `Json Web Token is invalid, Try again!`;
//       err = new ErrorHandler(message, 400);
//     }
//     if (err.name === "TokenExpiredError") {
//       const message = `Json Web Token is expired, Try again!`;
//       err = new ErrorHandler(message, 400);
//     }
//     if (err.name === "CastError") {
//       const message = `Invalid ${err.path}`,
//         err = new ErrorHandler(message, 400);
//     }

//     const errorMessage = err.errors
//       ? Object.values(err.errors)
//           .map((error) => error.message)
//           .join(" ")
//       : err.message;

//     return res.status(err.statusCode).json({
//       success: false,
//       // message: err.message,
//       message: errorMessage,
//     });
//   };

//   export default ErrorHandler;

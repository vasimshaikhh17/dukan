import express from "express";
import dotenv from "dotenv";
import { User } from "./model/userModel.js";
import { Product } from "./model/productModel.js";
import { connectDB } from "./config/config.js";
import authRouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import productRouter from "./routes/productRoutes.js";
import blogCatRoutes from "./routes/blogCatRoutes.js";
import testingRoutes from "./routes/testingRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import PaymentRoutes from './routes/paymentRoutes.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import wishListRoutes from "./routes/wishListRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import topProductRoutes from "./routes/topProductsRoutes.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import cloudinary from "cloudinary";


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());
// app.use(bodyParser.json())s
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/brand", brandRoutes);
app.use("/api/blogCat", blogCatRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/testing", testingRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/topProduct", topProductRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/pay", PaymentRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

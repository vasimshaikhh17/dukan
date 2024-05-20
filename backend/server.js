import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/config.js';
import authRouter from './routes/authRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import productRouter from './routes/productRoutes.js'
import bodyParser from 'body-parser';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express()
connectDB();
// app.use(bodyParser.json())s
app.use(cors())
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json())
app.use('/api/user',authRouter);
app.use('/api/product',productRouter);
app.use('/api/blog',blogRouter);


app.use(notFound)
app.use(errorHandler)
app.listen(PORT,()=>{
   console.log(`Server is running on PORT ${PORT}`);
})
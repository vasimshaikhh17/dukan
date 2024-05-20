import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controller/productController.js';
import {isAdmin,authMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router();
router 
    .post('/',authMiddleware,isAdmin,createProduct)
    .get('/:id',getProduct)
    .get('/',getAllProduct)
    .put('/:id',authMiddleware,isAdmin,updateProduct)
    .delete('/:id',authMiddleware, isAdmin,deleteProduct)
    


export default router
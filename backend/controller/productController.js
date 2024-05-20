import asyncHandler from "express-async-handler";
import { Product } from "../model/productModel.js";
import slugify from "slugify";

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
  console.log(id)
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate({ _id:id }  , req.body, {
      new: true,
    });
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
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllProduct = asyncHandler(async (req, res) => {
  console.log(req.query);
  try {
    //Filtering
    const queryObj = {...req.query};
    const excludeFields = ['page','sort','limit','fields'];
    excludeFields.forEach((el)=> delete queryObj[el]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);    
    let query = Product.find(JSON.parse(queryString))

    // Sorting
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    }else{
      query = query.sort('-createdAt');
    }
    //Limiting the Fields
    if(req.query.fields){
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }else{
      query = query.select('-__v');
    }

    //pagination
 
    const page = req.query.page
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    // console.log(page,limit,skip); 
    query = query.skip(skip).limit(limit);
    if(req.query.page){
      const productCount = await Product.countDocuments();
      if(skip >= productCount) throw new Error('This page does not Exist')
    } 

    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
}); 

export const deleteProduct = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  try{
    const deletedProduct = await Product.findOneAndDelete({_id:id})
    res.json(deletedProduct)
  }catch (error){
    throw new Error(error);
  }
})
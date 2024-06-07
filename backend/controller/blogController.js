import { Blog } from "../model/blogModel.js";
//import { User } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A Blog with this slug already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate key error: A Blog with this slug already exists.",
      });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numVeiws: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();
    res.json(getBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    throw new Error(error);
  }
});

export const likeTheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  // console.log(blogId, req.body);
  validateMongoDbId(blogId);

  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // Find the login user
  const loginUserId = req?.user?._id;
  //find if the user has liked the blog
  const isLiked = blog?.isLiked;
  //find the user if the user has Disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId = userId?.toString() === loginUserId?.toString())
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

export const disLikeTheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  // console.log(blogId, req.body);/
  // validateMongoDbId(blogId)

  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // Find the login user
  const loginUserId = req?.user?._id;
  //find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  //find the user if the user has Disliked the blog
  const alreadyLiked = blog?.dislikes?.find(
    (userId = userId?.toString() === loginUserId?.toString())
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

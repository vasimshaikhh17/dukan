import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createBlog, deleteBlog, disLikeTheBlog, getAllBlogs, getBlog, likeTheBlog, updateBlog } from '../controller/blogController.js';

const router = express.Router();

router
    .post('/',authMiddleware,isAdmin,createBlog)
    .put('/dislikes',authMiddleware,disLikeTheBlog)

    .put('/likes',authMiddleware,likeTheBlog)

    .put('/:id',authMiddleware,isAdmin,updateBlog)
    .get("/:id",getBlog)
    .get('/',getAllBlogs)
    .delete('/:id',deleteBlog)

export default router
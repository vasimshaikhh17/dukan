import express from 'express';
import { blockUser, createUser, deleteAUser, forgotPasswordToken, getAUser, getAllUser, handleRefreshToken, loginUserctrl, logout, resetPassword, unBlockUser, updateAUser, updatePassword } from '../controller/userController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router()


router
    .post('/register',createUser)
    .post('/forgot-password-token',forgotPasswordToken)
    .put('/reset-password/:token',resetPassword)
    .put('/password',authMiddleware,updatePassword) 
    .post('/login',loginUserctrl)
    .get('/all-users',getAllUser )
    .get('/:id',authMiddleware , isAdmin ,getAUser)
    .get('/refresh',handleRefreshToken)
    .get('/logout',logout)
    .delete('/:id',deleteAUser)
    .put('/edit-user',authMiddleware,updateAUser)
    .put('/block-user/:id',authMiddleware , isAdmin ,blockUser)
    .put('/unblock-user/:id',authMiddleware , isAdmin ,unBlockUser)

export default router
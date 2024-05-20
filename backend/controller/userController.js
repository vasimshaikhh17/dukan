import { generateToken } from "../config/jwtToken.js";
import { User } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import { sendEmail } from "./emailController.js";
import crypto from 'crypto';

export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json({success:true,newUser,msg:'User Registered Successfully'});
  } else {
    throw new Error("User Already Exisits")
    res.json({success:false,msg:'User Already Exisits'});
  }
});

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
      msg:"Logged in Successfully",
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

export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    res.json({getUser});
  } catch (error) {
    throw new Error(error);
  }
  // console.log(id, "id");
});

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
  console.log(refreshToken)
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

export const logout = asyncHandler(async(req,res)=>{
  const cookie = req.cookies;
  if(!cookie?.refreshToken) throw new Error('No Referesh Token in Cookies');
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken});
  if(!user){
    res.clearCookie('refreshToken',{
      httpOnly:true,
      secure:true,
    });
    return res.status(204); //Forbiden
  }
  await User.findOneAndUpdate(refreshToken,{
    refreshToken:'',
  });
  res.clearCookie('refreshToken',{
    httpOnly:true,
    secure:true,
  });
  return res.status(204); //Forbiden
});


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

export const updatePassword = asyncHandler(async(req,res)=>{
  const { _id } = req.user;
  const {password} = req.body
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  // console.log(user.password)
  if(password){
    // console.log('true')
    user.password = password;
  
    const updatedPassword = await user.save();
    // console.log(updatedPassword,'uodated password')
    res.json(updatedPassword)
  }else{
    // console.log(false)
    res.json(user)
  }
})

export const forgotPasswordToken = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user)throw new Error('User not Found with this email');
    try{
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now . <a href='http://localhost:5173/reset-password/${token}'>click here</a>`
      const data = {
        to:email,
        text:"Hey User",
        subject:"Forgot Password Link",
        html:resetURL
      };
      sendEmail(data);
      res.json(token);
    }catch (error){
      throw new Error(error)
    }
})

export const resetPassword = asyncHandler(async(req,res)=>{
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken:hashedToken,
      passwordResetExpires:{$gt:Date.now()},
    });
    if(!user) throw new Error("Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined ; 
   user.passwordResetExpires = undefined ;
   await user.save();
    res.json(user)
    
})
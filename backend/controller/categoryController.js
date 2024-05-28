import { errorHandler } from "../middlewares/errorHandler.js";
import { Category } from "../model/categoryModels.js";
import { SubCategory } from "../model/subCategoryModel.js";
import { User } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongodbId.js";


// export const createCategory = async (req, res, next) => {
//   const { name, icon, color, createdBy } = req.body;

//   if (!name || !color || !icon || !createdBy) {
//     return next(new errorHandler("Please fill in all fields", 400));
//   }

//   try {
//     const alreadyExist = await Category.findOne({ name });
//     if (alreadyExist) {
//       return next(new errorHandler("Category already exists", 400));
//     }

//     const existingUser = await User.findOne({ _id: createdBy });
//     if (!existingUser) {
//       return next(new errorHandler("User doesn't exist", 400));
//     }

//     const admin = await User.findOne({ role: "admin" });
//     const createdByAdmin = admin._id === createdBy;

//     const createdCategory = await Category.create({
//       name,
//       icon,
//       color,
//       createdBy,
//       createdByAdmin: createdByAdmin ? true : false,
//     });

//     if (createdCategory) {
//       return res.status(200).json({
//         success: true,
//         msg: "Your category has been submitted successfully. It is awaiting approval.",
//       });
//     }
//   } catch (error) {
//     return next(new errorHandler(error.message, 500));
//   }
// };

export const createCategory = async (req, res, next) => {
  const {category,title,imageUrl} = req.body;
  try {
    const categoryCreate = await Category.create({category,title,imageUrl});
    res.json(categoryCreate);
  } catch (error) {
    // throw new Error(error);
    console.log(error)
  }
};


export const createSubCategory = async (req, res, next) => {
  const { category } = req.body;
  try {
    const subCategory = await SubCategory.create({ category });
    res.json(subCategory);
  } catch (error) {
    next(new Error('Error in Create SubCategory API!'));
  }
};

export const getSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);
  } catch (error) {
    next(new Error('Error in Get SubCategories API!'));
  }
};

export const updateSubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;
  validateMongoDbId(id)
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(id, { category }, { new: true });
    if (!subCategory) {
      res.status(404).json({ message: 'SubCategory not found!' });
    } else {
      res.json(subCategory);
    }
  } catch (error) {
    next(new Error('Error in Update SubCategory API!'));
  }
};

export const deleteSubCategory = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
      res.status(404).json({ message: 'SubCategory not found!' });
    } else {
      res.json({ message: 'SubCategory deleted successfully!' });
    }
  } catch (error) {
    next(new Error('Error in Delete SubCategory API!'));
  }
};



export const approvalList = async (req, res, next) => {
  try {
    // Fetch the admin user
    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      return res.status(404).json({ success: false, msg: "Admin not found" });
    }

    // Check if the requester is an admin
    const isAdmin = admin._id.toString() === req.body.params;

    // Fetch all categories
    const categories = await Category.find();

    // Log the fetched data
    // console.log(categories);

    // Respond with the fetched data
    if (isAdmin) {
      return res.status(200).json({
        success: true,
        msg: "Admin data fetched successfully",
        data: categories,
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "Data fetched successfully",
        data: categories,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  //validateMongoId(id);
  try {
    const updateProductCategory = await Category.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProductCategory);
  } catch (error) {
    throw new Error("Error In Update Catgory API!");
  }
});
//Delete the ProductsCategory
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
 // validateMongoId(id);
  try {
    const deleteProductCategory = await Category.findByIdAndDelete(id);
    res.json(deleteProductCategory);
  } catch (error) {
    throw new Error("Error in Delete Product API!");
  }
});

//Fetch Single Product Category
export const fetchSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
 // validateMongoId(id);
  try {
    const getCategory = await Category.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error("Single Category API!");
  }
});

// Fetch All Products Category
export const fetchAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error("Error in Get All Category API!");
  }
});

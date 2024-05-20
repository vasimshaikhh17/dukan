import ErrorHandler from "../middlewares/errorMiddleware.js"
import { categoryModal } from "../model/categoryModel.js"
import { userModel } from "../model/userModel.js"

export const createCategory = async (req, res, next) => {
    const { name, icon, color, createdBy } = req.body;

    if (!name || !color || !icon || !createdBy) {
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    try {
        const alreadyExist = await categoryModal.findOne({ name });
        if (alreadyExist) {
            return next(new ErrorHandler("Category already exists", 400));
        }

        const existingUser = await userModel.findOne({ _id: createdBy });
        if (!existingUser) {
            return next(new ErrorHandler("User doesn't exist", 400));
        }

        const admin = await userModel.findOne({ role: 'admin' });
        const createdByAdmin = admin._id === createdBy;

        const createdCategory = await categoryModal.create({
            name,
            icon,
            color,
            createdBy,
            createdByAdmin: createdByAdmin ? true : false
        });

        if (createdCategory) {
            return res.status(200).json({ success: true, msg: "Your category has been submitted successfully. It is awaiting approval." });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

export const approvalList = async (req, res, next) => {
    try {
        // Fetch the admin user
        const admin = await userModel.findOne({ role: 'admin' });

        if (!admin) {
            return res.status(404).json({ success: false, msg: 'Admin not found' });
        }

        // Check if the requester is an admin
        const isAdmin = admin._id.toString() === req.body.params;

        // Fetch all categories
        const categories = await categoryModal.find();

        // Log the fetched data
        console.log(categories);

        // Respond with the fetched data
        if (isAdmin) {
            return res.status(200).json({ success: true, msg: 'Admin data fetched successfully', data: categories });
        } else {
            return res.status(200).json({ success: true, msg: 'Data fetched successfully', data: categories });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};


export const categoryApproval = async (req,res,next)=>{

}

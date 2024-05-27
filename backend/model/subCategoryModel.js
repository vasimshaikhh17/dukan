import mongoose from "mongoose";

//schema
const subCategorySchema = new mongoose.Schema(
  {
    category:{
       type: String,
      required: [true, "category title is required"],
    },
  },
  { timestamps: true }
);

//export
export const SubCategory = mongoose.model("SubCategory", subCategorySchema);

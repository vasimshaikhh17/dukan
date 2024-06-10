import mongoose from "mongoose";

//schema
const subCategorySchema = new mongoose.Schema(
  {
    sub_category:{
       type: String,
      required: [true, "Sub-Category title is required"],
    },
  },
  { timestamps: true }
);

//export
export const SubCategory = mongoose.model("SubCategory", subCategorySchema);

import mongoose from "mongoose";
import { Category } from "./categoryModels.js";

//schema
const subCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "SubCategory Title is required"],
    },
    image: {
      type: String,
      required: [true, "SubCategory Image is required"],
    },
  },
  { timestamps: true }
);

subCategorySchema.pre("remove", async function (next) {
  try{
    await Category.updateMany({}, { $pull: { products: this._id } });
    next();
  }catch(err){
    console.log(err)
    next();
  }
});

//export
export const SubCategory = mongoose.model("SubCategory", subCategorySchema);

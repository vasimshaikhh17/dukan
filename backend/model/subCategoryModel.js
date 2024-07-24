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

// subCategorySchema.pre("remove", async function (next) {
//   console.log(`Pre-remove hook triggered for SubCategory ID: ${this._id}`);
//   try {
//     const result = await Category.updateMany({}, { $pull: { sub_category: this._id } });
//     console.log("Subcategory ID removed from all categories", result);
//     next();
//   } catch (err) {
//     console.error("Error during update:", err);
//     next(err);
//   }
// });

//export
export const SubCategory = mongoose.model("SubCategory", subCategorySchema);

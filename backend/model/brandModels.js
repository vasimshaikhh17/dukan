import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image:{
      type:String,
      required:[true,"Brand Image is required"]
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
export const Brand = mongoose.model("Brand", brandSchema);

  import mongoose from "mongoose";

  const imageSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    Image_Url: [
      {
        type: String,
        required: true,
      },
    ],
  });

  export const Image = mongoose.model("Image", imageSchema);

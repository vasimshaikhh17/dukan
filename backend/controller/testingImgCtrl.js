import cloudinary from "cloudinary";
import fs from "fs";
import { Image } from "../model/testingModels.js";

export const uploadImage = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    const newImage = new Image({ Image_Url: uploadResult.secure_url });
    await newImage.save();

    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else console.log("File Successfully Deleted");
    });

    res.json({
      message: "Successfully uploaded",
      file_url: { image_url: uploadResult.secure_url },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

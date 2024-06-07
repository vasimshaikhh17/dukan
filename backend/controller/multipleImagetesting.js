import cloudinary from "cloudinary";
import fs from "fs";
import { Image } from "../model/testingModels.js";

// export const multipleUploadImages = async (req, res) => {
//   try {
//     const uploadResults = await Promise.all(
//       req.files.map((file) => cloudinary.uploader.upload(file.path))
//     );

//     const imageUrls = uploadResults.map(
//       (uploadResult) => uploadResult.secure_url
//     );

//     const newImages = imageUrls.map((url) => new Image({ Image_Url: url }));
//     await Image.insertMany(newImages);
//     console.log("Uploaded!");

//     req.files.forEach((file) => {
//       fs.unlink(file.path, function (err) {
//         if (err) console.log(err);
//         else console.log("\nFile Successfully Deleted");
//       });
//     });

//     res.json({
//       message: "Successfully",
//       file_urls: imageUrls,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while uploading the images.");
//   }
// };

export const multipleUploadImages = async (req, res) => {
  const { name } = req.body;
  try {
    // Upload all images to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map((file) => cloudinary.uploader.upload(file.path))
    );

    // Map the results to get an array of secure URLs
    const imageUrls = uploadResults.map(
      (uploadResult) => uploadResult.secure_url
    );

    // Log the URLs to verify
    console.log("Image URLs:", imageUrls);

    // Create a new Image document with the array of URLs
    const newImage = new Image({
      name: name,
      Image_Url: imageUrls,
    });

    // Save the document to the database
    await newImage.save();
    console.log("Uploaded!");

    // Delete the files from the local filesystem
    req.files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) console.log(err);
        else console.log("\nFile Successfully Deleted");
      });
    });

    // Respond with success
    res.json({
      name: name,
      message: "Successfully uploaded",
      file_urls: imageUrls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while uploading the images.");
  }
};

import cloudinary from "cloudinary";

cloudinary.config({
  Cloud_Name: process.env.CLOUDINARY_NAME,
  Cloud_Api_Key: process.env.CLOUDINARY_API_KEY,
  Cloud_Secret_Key: process.env.CLOUDINARY_API_SECRET,
});

//Cloudinary function
export const cloudinaryuploadImg = async (fileToUploads, folder) => {
  console.log("hello");
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUploads, { folder }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      }
    });
  });
};

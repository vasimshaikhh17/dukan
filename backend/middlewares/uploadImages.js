import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/images/"));
//   },
//   filename: function (req, file, cb) {
//     const uniquesuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "_" + uniquesuffix + ".jpeg");
//   },
// });

// const multerFilter = (req, file, cb) => {
//   // console.log(req.files, "files");
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Unsupported file format"), false);
//   }
// };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

export const uploadPhoto = multer({ storage });

// export const uploadPhotoo = multer({
//   storage: storage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 2000000 },
// });

export const prodcutImgResized = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );
  next();
};

export const blogsImgResized = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`../public/images/blogs/${file.filename}`);
      fs.unlinkSync(`../public/images/blogs/${file.filename}`);
    })
  );
  next();
};

import express from "express";
import { upload } from "../middlewares/testingMiddleware.js";
import { uploadImage } from "../controller/testingImgCtrl.js";
import { multipleUploadImages } from "../controller/multipleImagetesting.js";

const router = express.Router();
router.post("/testing-cloud", upload.single("myFile"), uploadImage);

router.post(
  "/multipleImage-upload",
  upload.array("myFile", 10),
  multipleUploadImages
);

export default router;

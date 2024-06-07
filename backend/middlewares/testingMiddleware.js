import multer from "multer";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: async function (req, file, cb) {
    const random = uuidv4();
    cb(null, random + "" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

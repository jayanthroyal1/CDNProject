import multer from "multer";
import path from "path";
import { ALLOWED_MIME_TYPES } from "../constants/file.constants.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      return cb(null, "uploads/images");
    }
    if (file.mimetype === "application/pdf") {
      return cb(null, "uploads/pdfs");
    }

    if (file.mimetype.startsWith("video")) {
      return cb(null, "uploads/videos");
    }

    return cb(null, "uploads/reports");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, //100 MB
  },

  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"));
    }

    cb(null, true);
  },
});

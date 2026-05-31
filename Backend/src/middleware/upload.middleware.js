import multer from "multer";
import path from "path";
import { ALLOWED_MIME_TYPES } from "../constants/file.constants.js";

import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "uploads/reports";
    if (file.mimetype.startsWith("image")) {
      dir = "uploads/images";
    } else if (file.mimetype === "application/pdf") {
      dir = "uploads/pdfs";
    } else if (file.mimetype.startsWith("video")) {
      dir = "uploads/videos";
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return cb(null, dir);
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

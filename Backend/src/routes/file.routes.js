import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";

import { authorize } from "../middleware/role.middleware.js";

import { upload } from "../middleware/upload.middleware.js";

import {
  uploadFileController,
  getFilesController,
  getFileController,
  deleteFileController,
} from "../controllers/file.controller.js";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  uploadFileController,
);

router.get("/", authenticate, getFilesController);

router.get("/:id", authenticate, getFileController);

router.delete("/:id", authenticate, deleteFileController);

export default router;

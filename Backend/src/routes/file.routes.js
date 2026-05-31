import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";

import { authorize } from "../middleware/role.middleware.js";

import { upload } from "../middleware/upload.middleware.js";

import {
  uploadFileController,
  getFilesController,
  getFileController,
} from "../controllers/file.controller.js";

const router = Router();

router.post(
  "/upload",
  authenticate,
  authorize("admin"),
  upload.single("file"),
  uploadFileController,
);

router.get("/", getFilesController);

router.get("/:id", getFileController);

export default router;

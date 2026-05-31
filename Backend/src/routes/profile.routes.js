import express from "express";
import {
  getProfileController,
  updateProfileController,
} from "../controllers/profile.controller.js";
import { authLimiter } from "../middleware/rate-limit.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { profileSchema } from "../validations/profile.validation.js";

const router = express.Router();

router.get("/", getProfileController);
router.put(
  "/",
  authenticate,
  validate(profileSchema),
  updateProfileController,
);

export default router;

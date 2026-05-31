import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";

import { authorize } from "../middleware/role.middleware.js";

import { validate } from "../middleware/validate.middleware.js";

import {
  createContactController,
  getContactsController,
  updateContactStatusController,
} from "../controllers/contact.controller.js";

import {
  createContactSchema,
  updateStatusSchema,
} from "../validations/contact.validation.js";
import { authLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post(
  "/",
  authLimiter,
  validate(createContactSchema),
  createContactController,
);

router.get("/", authenticate, authorize("admin"), getContactsController);

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  validate(updateStatusSchema),
  updateContactStatusController,
);

export default router;

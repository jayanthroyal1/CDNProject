import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";

import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/dashboard",

  authenticate,

  authorize("admin"),

  (req, res) => {
    res.json({
      success: true,

      message: "Admin Dashboard Access Granted",
    });
  },
);

export default router;

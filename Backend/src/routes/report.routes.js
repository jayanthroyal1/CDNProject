import { Router } from "express";

import { getChartData } from "../controllers/report.controller.js";

const router = Router();

router.get(
  "/:id/chart",

  getChartData,
);

export default router;

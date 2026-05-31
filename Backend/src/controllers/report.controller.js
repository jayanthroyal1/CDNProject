import { fetchFileService } from "../services/file.service.js";
import redisClient from "../config/redis.js";
import { asyncHandler } from "../utils/async-handler.js";

export const getChartData = asyncHandler(async (req, res) => {
  const cacheKey = `report:${req.params.id}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const report = await fetchFileService(req.params.id);

  if (!report || !report.metadata || !report.metadata.rows || report.metadata.rows.length === 0) {
    return res.status(404).json({ success: false, message: "No chart data available for this file." });
  }

  const rows = report.metadata.rows;
  const keys = Object.keys(rows[0] || {});

  if (keys.length < 2) {
    return res.status(400).json({ success: false, message: "CSV/Excel must have at least 2 columns to generate a chart." });
  }

  const labels = rows.map((item) => item[keys[0]]);
  const values = rows.map((item) => Number(item[keys[1]]) || 0);

  const response = {
    success: true,

    data: {
      labels,
      values,
    },
  };

  await redisClient.set(
    cacheKey,

    JSON.stringify(response),

    {
      EX: 300,
    },
  );

  return res.json(response);
});

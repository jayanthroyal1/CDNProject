import { fetchFileService } from "../services/file.service.js";
import redisClient from "../config/redis.js";

export const getChartData = async (req, res) => {
  const cacheKey = `report:${req.params.id}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const report = await fetchFileService(req.params.id);

  const rows = report.metadata.rows;

  const keys = Object.keys(rows[0]);

  const labels = rows.map((item) => item[keys[0]]);

  const values = rows.map((item) => Number(item[keys[1]]));

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
};

import { fetchFile } from "../services/file.service.js";

export const getChartData = async (req, res) => {
  const report = await fetchFile(req.params.id);

  const rows = report.metadata.rows;

  const keys = Object.keys(rows[0]);

  const labels = rows.map((item) => item[keys[0]]);

  const values = rows.map((item) => Number(item[keys[1]]));

  return res.json({
    success: true,

    data: {
      labels,
      values,
    },
  });
};

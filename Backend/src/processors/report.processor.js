import fs from "fs";
import csvParser from "csv-parser";

export const processCsv = (filePath) =>
  new Promise((reslove, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => rows.push(data))
      .on("end", () => {
        reslove({ rowCount: rows.length, columns: Object.keys(rows[0] || {}) });
      })
      .on("error", reject);
  });

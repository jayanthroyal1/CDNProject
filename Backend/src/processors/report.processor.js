import fs from "fs";
import csvParser from "csv-parser";

export const processCsv = (filePath) =>
  new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => rows.push(data))
      .on("end", () => {
        resolve({ 
          rowCount: rows.length, 
          columns: Object.keys(rows[0] || {}),
          preview: rows.slice(0, 10),
          rows: rows 
        });
      })
      .on("error", reject);
  });

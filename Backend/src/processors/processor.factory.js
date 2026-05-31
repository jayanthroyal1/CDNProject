import { processImage } from "./image.processor.js";

import { processPdf } from "./pdf.processor.js";

import { processCsv } from "./report.processor.js";

import { processExcel } from "./excel.processor.js";

export const processFile = async (fileType, filePath, mimeType) => {
  switch (fileType) {
    case "image":
      return processImage(filePath);

    case "pdf":
      return processPdf(filePath);

    case "report":
      if (mimeType === "text/csv") {
        return processCsv(filePath);
      }

      return processExcel(filePath);

    default:
      return {};
  }
};

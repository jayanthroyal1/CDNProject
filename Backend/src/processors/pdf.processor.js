import fs from "fs";

import pdf from "pdf-parser";

export const processPdf = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const result = await pdf(buffer);

  return {
    pages: result.numpages,
    textLength: result.text.length,
  };
};

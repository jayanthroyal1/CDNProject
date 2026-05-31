import fs from "fs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export const processPdf = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const result = await pdf(buffer);

  return {
    pages: result.numpages,
    textLength: result.text.length,
  };
};

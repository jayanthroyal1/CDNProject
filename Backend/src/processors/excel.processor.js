import XLSX from "xlsx";

export const processExcel = async (filePath) => {
  const workbook = XLSX.readFile(filePath);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json(sheet);

  return {
    rowCount: data.length,

    columns: Object.keys(data[0] || {}),

    preview: data.slice(0, 10),

    rows: data,
  };
};

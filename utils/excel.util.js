const XLSX = require('xlsx');

async function readExcelFile({ filePath }) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { defval: null });
}

module.exports = {
  readExcelFile,
};

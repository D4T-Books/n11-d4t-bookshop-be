const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf-parse");

async function getPdfText(pdfPath) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdf = await PDFParser(pdfBuffer);
  return pdf.text;
}

const run = async () => {
  let tmp;
  const pdfFileName = "dac_nhan_tam.pdf";
  const pdfPath = path.join(__dirname, pdfFileName);
  tmp = await getPdfText(pdfPath);

  console.log("tmp :>> ", tmp);
};

run();

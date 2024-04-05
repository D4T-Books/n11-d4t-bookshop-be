const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdf-lib").PDFDocument;

async function splitPdf(pathToPdf, pageNumber) {
  const docmentAsBytes = await fs.promises.readFile(pathToPdf);

  // Load your PDFDocument
  const pdfDoc = await PDFDocument.load(docmentAsBytes);

  // Lấy số trang
  const numberOfPages = pdfDoc.getPages().length;

  if (pageNumber === 0 || pageNumber > numberOfPages) {
    console.log(`Số trang phải từ 1 đến ${numberOfPages}`);
    return;
  }

  // Tạo document con: subDocument
  const subDocument = await PDFDocument.create();

  // Tạo bản sao copiedPage và add vào subDocument
  const [copiedPage] = await subDocument.copyPages(pdfDoc, [pageNumber - 1]);
  subDocument.addPage(copiedPage);

  const pdfBytes = await subDocument.save();

  // Tạo ra file mới
  await writePdfBytesToFile(`Trang-${pageNumber}.pdf`, pdfBytes);
}

function writePdfBytesToFile(fileName, pdfBytes) {
  return fs.promises.writeFile(fileName, pdfBytes);
}

(async () => {
  const pathToPdf = path.resolve(__dirname, "Demo.pdf");
  const pageNumberNeeded = 1;
  await splitPdf(pathToPdf, pageNumberNeeded);
})();

import path from "path";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

async function splitPdf(pageNumber: any) {
  const pathToPdf = path.resolve(__dirname, "Demo.pdf");

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

  return pdfBytes;
}

export default splitPdf;

// function writePdfBytesToFile(fileName: any, pdfBytes: any) {
//   console.log("pdfBytes :>> ", pdfBytes);
//   return fs.promises.writeFile(fileName, pdfBytes);
// }

// (async () => {
//   const pathToPdf = path.resolve(__dirname, "Demo.pdf");
//   const pageNumberNeeded = 1;
//   await splitPdf( pageNumberNeeded);
// })();

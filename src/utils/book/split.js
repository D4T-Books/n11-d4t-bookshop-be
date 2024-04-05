const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdf-lib").PDFDocument;

async function splitPdf(pathToPdf, fName) {
  const docmentAsBytes = await fs.promises.readFile(pathToPdf);

  // Load your PDFDocument
  const pdfDoc = await PDFDocument.load(docmentAsBytes);

  const numberOfPages = pdfDoc.getPages().length;

  for (let i = 0; i < numberOfPages; i++) {
    // Create a new "sub" document
    const subDocument = await PDFDocument.create();
    // copy the page at current index
    const [copiedPage] = await subDocument.copyPages(pdfDoc, [i]);
    subDocument.addPage(copiedPage);
    const pdfBytes = await subDocument.save();
    await writePdfBytesToFile(`${fName}-trang-${i + 1}.pdf`, pdfBytes);
  }
}

function writePdfBytesToFile(fileName, pdfBytes) {
  return fs.promises.writeFile(fileName, pdfBytes);
}

(async () => {
  const pathToPdf = path.resolve(
    __dirname,
    "Nói nhiều không bằng nói đúng.pdf"
  );
  const fName = "Nói nhiều không bằng nói đúng";
  await splitPdf(pathToPdf, fName);
})();

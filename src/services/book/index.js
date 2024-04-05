// index.js

// Assuming you've imported necessary modules like fetch and fs

// Function to write PDF bytes to a file
async function writePdfBytesToFile(fileName, pdfBytes) {
  console.log("pdfBytes :>> ", pdfBytes);
  return fs.promises.writeFile(fileName, pdfBytes);
}

// URL to fetch the PDF from
const PDF_URL = "http://localhost:3000/v1/api/book/demo";

// Function to fetch PDF bytes
const fetchPDFBytesJSON = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; // Assuming the response directly contains PDF bytes
  } catch (error) {
    console.log("error :>> ", error);
    throw error; // Re-throw the error to be caught by the caller if necessary
  }
};

// Function to display PDF
const showPDF = async () => {
  const embedElement = document.getElementById("embed");
  try {
    const pdfBytes = await fetchPDFBytesJSON(PDF_URL);
    // Assuming pdfBytes is already an ArrayBuffer or Uint8Array
    const pdfData = await encodePdfBytes(pdfBytes);
    embedElement.src = `data:application/pdf;base64,${pdfData}`;
  } catch (error) {
    console.error("Failed to fetch or display PDF:", error);
  }
};

// Function to encode PDF bytes to base64
const encodePdfBytes = async (pdfBytes) => {
  // Assuming pdfBytes is already an ArrayBuffer or Uint8Array
  const binary = new Uint8Array(pdfBytes);
  return btoa(String.fromCharCode(...binary));
};

showPDF();

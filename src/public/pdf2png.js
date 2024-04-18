const fs = require("fs");
const path = require("path");
const pdfPoppler = require("pdf-poppler");

async function convertPdfToImage(pdfPath, outputPath, title) {
  try {
    const options = {
      format: "png",
      out_dir: outputPath,
      out_prefix: `${title}`,
      page: null,
    };

    await pdfPoppler.convert(pdfPath, options);
    console.log("Chuyển đổi PDF thành ảnh thành công!");
  } catch (error) {
    console.error("Đã xảy ra lỗi khi chuyển đổi PDF thành ảnh:", error);
  }
}

for (let index = 1; index <= 10; index++) {
  let curString = "";
  if (index === 1) {
    curString = "7_thoi_quen_de_thanh_dat";
  }
  if (index === 2) {
    curString = "chien_thang_con_quy_trong_ban";
  }
  if (index === 3) {
    curString = "dac_nhan_tam";
  }
  if (index === 4) {
    curString = "dam_nghi_lon";
  }
  if (index === 5) {
    curString = "magic_of_thinking";
  }
  if (index === 6) {
    curString = "noi_nhieu_khong_bang_noi_dung";
  }
  if (index === 7) {
    curString = "outwitting_the_devil";
  }
  if (index === 8) {
    curString = "phi_ly_tri";
  }
  if (index === 9) {
    curString = "predictable";
  }
  if (index === 10) {
    curString = "suy_nghi_va_lam_giau";
  }

  const pdfPath = path.resolve(__dirname, `${curString}.pdf`);
  console.log("pdfPath :>> ", pdfPath);
  const outputPath = path.resolve(__dirname, "books", `${curString}`);

  convertPdfToImage(pdfPath, outputPath, `${curString}`);
  curString = "";
  console.log("curString :>> ", curString);
}

// const pdfPath = path.resolve(__dirname, "dac_nhan_tam.pdf");
// console.log("pdfPath :>> ", pdfPath);
// const outputPath = path.resolve(__dirname, "books", "dac_nhan_tam");

// convertPdfToImage(pdfPath, outputPath, "dac_nhan_tam");
console.log("END");

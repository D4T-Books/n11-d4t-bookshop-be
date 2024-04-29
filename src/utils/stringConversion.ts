function stringConversion(chuoi: string) {
  if (chuoi.trim() == "") chuoi = "qwerty";
  return chuoi
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("đ", "d")
    .replace("Đ", "d")
    .toLowerCase()
    .replace(/\s+/g, "_");
}

export default stringConversion;

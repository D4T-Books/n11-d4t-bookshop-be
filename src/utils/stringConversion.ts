function stringConversion(chuoi: any) {
  if (chuoi.toString().trim() == "") chuoi = "qwerty";

  return chuoi
    .toString()
    .trim()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll("đ", "d")
    .replaceAll("Đ", "d")
    .toLowerCase()
    .replaceAll(/\s+/g, "_");
}

export default stringConversion;

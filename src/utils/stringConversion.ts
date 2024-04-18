function stringConversion(chuoi: string) {
  return chuoi
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("đ", "d")
    .replace("Đ", "d")
    .toLowerCase()
    .replace(/\s+/g, "_");
}

export default stringConversion;

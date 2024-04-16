import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info", // Cấp độ log mặc định
  format: format.combine(
    format.timestamp(), // Thêm timestamp vào log
    format.simple() // Định dạng log đơn giản
  ),
  transports: [
    // new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

export default logger;

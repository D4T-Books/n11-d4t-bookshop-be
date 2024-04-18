// import { createLogger, transports, format } from "winston";

import winston from "winston";
import { LogLevels } from "../global";
const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

// const logger = createLogger({
//   level: "info", // Cấp độ log mặc định
//   format: format.combine(
//     format.timestamp(), // Thêm timestamp vào log
//     format.simple() // Định dạng log đơn giản
//   ),
//   transports: [
//     // new transports.Console(),
//     new transports.File({ filename: "app.log" }),
//   ],
// });

export default logger;

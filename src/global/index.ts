import { Request } from "express";

enum TransactionType {
  NAP = "NAP_XU",
  PAY = "THANH_TOAN",
}

enum LogLevels {
  error = 0,
  warn = 1,
  info = 2,
  http = 3,
  verbose = 4,
  debug = 5,
  silly = 6,
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

export { TransactionType, LogLevels, AuthenticatedRequest };

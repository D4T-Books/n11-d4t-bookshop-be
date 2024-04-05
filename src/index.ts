// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { createLogger, transports, format } from "winston";

import { NotFoundError } from "./responses/error.response.ts";
import router from "./routes/index.ts";

const app: Express = express();
const port = process.env.PORT || 3000;

// Init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Init router

app.use("/", router);

// Handling errors
interface CustomError extends Error {
  status?: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: NotFoundError = new NotFoundError();
  next(error);
});

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;

    return res.status(statusCode).json({
      status: "error",
      code: statusCode,
      message: error.message || "Internal Server Error!",
    });
  }
);

app.listen(port, () => {
  console.log(`[server]:: Server is running at http://localhost:${port}`);
});

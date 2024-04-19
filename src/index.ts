// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import router from "./routes/index.ts";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { rateLimitOptions } from "./configs/limit.config.ts";
import { NotFoundError } from "./responses/error.response.ts";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerOptions.ts";
import cookieParser from "cookie-parser";
import logger from "./configs/logger.config.ts";
import path from "path";

const app: Express = express();
const port = process.env.PORT || 3000;

// Init middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'self'", "http://localhost:3000"],
    },
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://localhost:5173",
      "https://ddung203.com:5173",
    ],
    credentials: true,
  })
);

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit(rateLimitOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Init router

app.get(
  "/v1/api/ping",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log(
      'req.headers["sec-ch-ua-platform"] :>> ',
      req.headers["sec-ch-ua-platform"]
    );
    console.log("req.cookies :>> ", req.cookies);
    logger.info(`\nOS:: ${req.headers["sec-ch-ua-platform"]}`);
    logger.info(`\nx-forwarded-port:: ${req.headers["x-forwarded-port"]}`);
    logger.info(`\nx-real-ip:: ${req.headers["x-real-ip"]}`);
    logger.info(`\nuser-agent:: ${req.headers["user-agent"]}`);

    return res.status(200).json({
      status: "success",
      message: "pong",
    });
  }
);

app.use("/", router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

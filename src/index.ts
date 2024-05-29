// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
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
import { currentTimestamp } from "./utils/getCurrentTimestamp.ts";

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
      "http://localhost:5174",
      "https://localhost:5173",
      "https://ddung203.com:5173",
    ],
    credentials: true,
  })
);

// const whitelist = ["http://localhost:5173", "http://localhost:5174"];
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

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
app.use("/", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//! Handling errors
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
  console.log(
    `[server] - [${currentTimestamp}]:: Server is running at http://localhost:${port}`
  );
});

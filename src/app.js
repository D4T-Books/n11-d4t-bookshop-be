import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
// import router from "./routes/index.js";

const app = express();

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

// Init routes
app.get("/check", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

// app.use("/", router);

// Handling errors
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  (error.status = 404), next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error!",
  });
});
export default app;

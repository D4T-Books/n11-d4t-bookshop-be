import express, { Router } from "express";
import accessRouter from "./access.route";
import transactionRouter from "./transaction.route";
import commentRouter from "./comment.route";
import bookRouter from "./book.route";
import userRouter from "./user.route";
import readRouter from "./read.route";

const router: Router = express.Router();

router.use("/v1/api", accessRouter);
router.use("/v1/api", transactionRouter);
router.use("/v1/api", commentRouter);
router.use("/v1/api", bookRouter);
router.use("/v1/api", userRouter);
router.use("/v1/api", readRouter);

export default router;

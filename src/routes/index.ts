import express, { Router } from "express";
import accessRouter from "./access/index";
import transactionRouter from "./transaction/index";
import commentRouter from "./comment/index";
import bookRouter from "./book/index";
import userRouter from "./user/index";

const router: Router = express.Router();

router.use("/v1/api", accessRouter);
router.use("/v1/api", transactionRouter);
router.use("/v1/api", commentRouter);
router.use("/v1/api", bookRouter);
router.use("/v1/api", userRouter);

export default router;

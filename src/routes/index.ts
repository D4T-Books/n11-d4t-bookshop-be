import express, { Router } from "express";
import accessRouter from "./access/index";
import transactionRouter from "./transaction/index";

const router: Router = express.Router();

router.use("/v1/api", accessRouter);
router.use("/v1/api", transactionRouter);

export default router;

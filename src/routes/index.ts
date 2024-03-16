import express, { Router } from "express";
import accessRouter from "./access/index";

const router: Router = express.Router();

router.use("/v1/api", accessRouter);

export default router;

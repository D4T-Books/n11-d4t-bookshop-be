import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import ReadController from "../controllers/read.controller.ts";
import { accessMiddleware } from "../middlewares/access.middleware.ts";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.ts";

const router = express.Router();

router.post(
  "/read",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["u", "A"]),
  asyncHandle(ReadController.readEachPage)
);
export default router;

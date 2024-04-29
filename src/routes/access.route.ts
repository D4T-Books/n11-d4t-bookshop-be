import express, { Request, Response, NextFunction } from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import AccessController from "../controllers/access.controller.ts";

const router = express.Router();

router.post("/access/register", asyncHandle(AccessController.register));
router.post(
  "/access/login-username",
  asyncHandle(AccessController.loginByUsername)
);
router.post("/access/login-email", asyncHandle(AccessController.loginByEmail));

router.post("/access/logout", asyncHandle(AccessController.logout));

router.post("/access/refresh", asyncHandle(AccessController.refreshToken));

export default router;

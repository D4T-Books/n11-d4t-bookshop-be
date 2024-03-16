"use strict";

import express, { Request, Response, NextFunction } from "express";
import asyncHandle from "./../../helpers/asyncHandle.ts";
import AccessController from "../../controllers/access.controller.ts";

const router = express.Router();

router.get(
  "/access/check",
  asyncHandle(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      return res.status(200).json({
        message: "check ok",
      });
    }
  )
);

router.post("/access/register", asyncHandle(AccessController.register));
router.post("/access/login", asyncHandle(AccessController.login));
router.post("/access/logout", asyncHandle(AccessController.logout));

export default router;

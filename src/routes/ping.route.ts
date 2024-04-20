import express, { Request, Response, NextFunction } from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import logger from "../configs/logger.config.ts";
import { testConnection } from "../configs/mysql2.config.ts";
import { InternalServerError } from "../responses/error.response.ts";

const router = express.Router();

router.get(
  "/ping",
  asyncHandle(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const data = `${req.headers["sec-ch-ua-platform"]} :: ${req.headers["x-forwarded-port"]} :: ${req.headers["x-real-ip"]} :: ${req.headers["user-agent"]}`;

      logger.info(`\nDevice:: ${data}`);

      if (!(await testConnection())) {
        throw new InternalServerError("Kết nối đến CSDL không thành công!");
      }

      return res.status(200).json({
        status: "success",
        message: "pong 🏓",
      });
    }
  )
);

export default router;

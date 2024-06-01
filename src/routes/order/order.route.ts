import express, { NextFunction, Request, Response } from "express";
import asyncHandle from "../../helpers/asyncHandle.ts";
import { accessMiddleware } from "../../middlewares/access.middleware.ts";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware.ts";
import OrderController from "../../controllers/order/order.controller.ts";

const router = express.Router();

router.post(
  "/order/create",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(OrderController.createOrder)
);

router.post(
  "/order/:orderId",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(OrderController.getByOrderId)
);

router.put(
  "/order/:orderId",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(OrderController.cancelOrder)
);

router.post(
  "/order/confirm-webhook",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(OrderController.confirmWebhook)
);

export default router;

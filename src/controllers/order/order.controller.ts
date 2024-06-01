import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../../responses/success.response.ts";
import OrderService from "../../services/order/order.service.ts";

class OrderController {
  static createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Create order!",
      metadata: await OrderService.createOrder(req.body),
    }).send(res);
  };

  static getByOrderId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get by orderId!",
      metadata: await OrderService.getByOrderId(req.params.orderId, req.body),
    }).send(res);
  };

  static cancelOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get by orderId!",
      metadata: await OrderService.cancelOrder(req.params.orderId, req.body),
    }).send(res);
  };

  static confirmWebhook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Confirm Webhook!",
      metadata: await OrderService.confirmWebhook(req.body),
    }).send(res);
  };
}

export default OrderController;

import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import { TransactionService } from "../services/index.ts";
import { AuthenticatedRequest } from "../global/index.ts";

class TransactionController {
  static addCoins = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add Coins success!",
      metadata: await TransactionService.addCoins(req.user, req.body),
    }).send(res);
  };

  static addCoinsByOrder = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add Coins success!",
      metadata: await TransactionService.addCoinsByOrder(req.body),
    }).send(res);
  };

  static useCoins = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Pay success!",
      metadata: await TransactionService.useCoins(req.user, req.body),
    }).send(res);
  };

  static getList = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get Transactions List success!",
      metadata: await TransactionService.getListTransactionByUsername(
        req.user,
        req.body
      ),
    }).send(res);
  };

  static getCurrentCoins = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get Current Coins success!",
      metadata: await TransactionService.getCurrentCoins(req.user),
    }).send(res);
  };
}

export default TransactionController;

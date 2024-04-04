import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import TransactionService from "./../services/access/transaction.service";

class TransactionController {
  static addCoins = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Add Coins success!",
      metadata: await TransactionService.addCoins(req.body),
    }).send(res);
  };
  static useCoins = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Pay success!",
      metadata: await TransactionService.useCoins(req.body),
    }).send(res);
  };
}

export default TransactionController;

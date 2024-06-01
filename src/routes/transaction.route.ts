import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import TransactionController from "../controllers/transaction.controller.ts";
import { accessMiddleware } from "../middlewares/access.middleware.ts";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.ts";

const router = express.Router();

router.post(
  "/transaction/add-coins-by-order",
  asyncHandle(TransactionController.addCoinsByOrder)
);

router.post(
  "/transaction/add-coins",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A", "U"]),
  asyncHandle(TransactionController.addCoins)
);

router.post(
  "/transaction/use-coins",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A", "U"]),
  asyncHandle(TransactionController.useCoins)
);

router.post(
  "/transaction/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A", "U"]),
  asyncHandle(TransactionController.getList)
);

router.get(
  "/transaction/coins",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A", "U"]),
  asyncHandle(TransactionController.getCurrentCoins)
);

export default router;

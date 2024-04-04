"use strict";

import express from "express";
import asyncHandle from "./../../helpers/asyncHandle.ts";
import TransactionController from "./../../controllers/transaction.controller";

const router = express.Router();

router.post(
  "/transaction/add-coins",
  asyncHandle(TransactionController.addCoins)
);

router.post(
  "/transaction/use-coins",
  asyncHandle(TransactionController.useCoins)
);
export default router;

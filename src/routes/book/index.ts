"use strict";

import express from "express";
import asyncHandle from "../../helpers/asyncHandle.ts";
import BookController from "./../../controllers/book.controller";

const router = express.Router();

router.get("/book/searchByName", asyncHandle(BookController.searchByName));

router.get(
  "/book/searchByCategories",
  asyncHandle(BookController.searchByCategories)
);

router.get(
  "/book/top5views",
  asyncHandle(BookController.searchTop5BookByViews)
);

export default router;

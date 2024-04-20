import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import BookController from "../controllers/book.controller.ts";

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

// ! For admin
router.post("/book/add", asyncHandle(BookController.addBook));

router.post("/book/toogle", asyncHandle(BookController.toggleShowBook));

router.post(
  "/book/create-bookmark",
  asyncHandle(BookController.createBookmark)
);

export default router;

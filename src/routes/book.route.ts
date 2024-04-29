import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import BookController from "../controllers/book.controller.ts";
import { accessMiddleware } from "../middlewares/access.middleware.ts";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.ts";

const router = express.Router();

router.post("/book/search-name", asyncHandle(BookController.searchByName));

router.post(
  "/book/search-category",
  asyncHandle(BookController.searchByCategories)
);

router.get(
  "/book/top-five-views",
  asyncHandle(BookController.searchTop5BookByViews)
);

// ! For admin
router.post(
  "/book/add",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(BookController.addBook)
);

router.post(
  "/book/toogle",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(BookController.toggleShowBook)
);

router.post(
  "/book/create-bookmark",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(BookController.createBookmark)
);

router.get(
  "/book/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(BookController.getAllBook)
);

router.post("/book/views/update", asyncHandle(BookController.updateBookView));

export default router;

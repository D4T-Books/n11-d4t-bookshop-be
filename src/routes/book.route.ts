import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import BookController from "../controllers/book.controller.ts";
import { accessMiddleware } from "../middlewares/access.middleware.ts";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.ts";

const router = express.Router();

router.post("/book/search-name", asyncHandle(BookController.searchByName));

router.post(
  "/book/search-category",
  asyncHandle(BookController.searchByCategory)
);

router.post(
  "/book/search-tag-name",
  asyncHandle(BookController.searchByTagName)
);

router.post(
  "/book/search-category",
  asyncHandle(BookController.searchByCategories)
);

router.get(
  "/book/top-five-views",
  asyncHandle(BookController.searchTop5BookByViews)
);

router.get("/book/top-six-new", asyncHandle(BookController.searchTop6NewBooks));

router.get("/book/free", asyncHandle(BookController.searchTop6FreeBooks));

// ! For admin
router.post(
  "/admin/book/add",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(BookController.addBook)
);

router.post(
  "/admin/book/toogle",
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

router.post(
  "/book/bookmarks",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(BookController.getBookmarksByTitle)
);

router.get(
  "/book/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(BookController.getAllBook)
);

router.post("/book/views/update", asyncHandle(BookController.updateBookView));

export default router;

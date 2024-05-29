import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import ReadController from "../controllers/read.controller.ts";
import { accessMiddleware } from "../middlewares/access.middleware.ts";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.ts";

const router = express.Router();

router.get(
  "/read",

  asyncHandle(ReadController.readEachPage)
);

router.post(
  "/read",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(ReadController.readEachPage)
);

router.post(
  "/read/tracking",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(ReadController.trackingBook)
);

router.post(
  "/read/buy",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(ReadController.buyBook)
);

router.post(
  "/read/tracking/loved",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(ReadController.trackingFavoriteBook)
);

router.post(
  "/read/tracking/loved/remove",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(ReadController.removeTrackingFavoriteBook)
);

router.get(
  "/read/tracking/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(ReadController.getTrackingBookList)
);

router.get(
  "/read/tracking/list/loved",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(ReadController.getFavoriteTrackedBookList)
);
export default router;

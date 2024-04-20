import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import UserController from "../controllers/user.controller.ts";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.ts";
import { accessMiddleware } from "../middlewares/access.middleware.ts";

const router = express.Router();

router.get(
  "/user/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(UserController.getAllUser)
);
router.get(
  "/user/getByUsername",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(UserController.getByUsername)
);
router.get(
  "/user/getById",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(UserController.getById)
);

router.get(
  "/user/deleteByUsername",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(UserController.deleteUserByUsername)
);
router.get(
  "/user/deleteById",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(UserController.deleteUserById)
);

router.put(
  "/user/update",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(UserController.update)
);

export default router;

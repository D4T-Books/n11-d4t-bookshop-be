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

router.post(
  "/user/getByUsername",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(UserController.getByUsername)
);

router.post(
  "/user/getById",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(UserController.getById)
);

router.post(
  "/user/deleteByUsername",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(UserController.deleteUserByUsername)
);
router.post(
  "/user/deleteById",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(UserController.deleteUserById)
);

// router.put(
//   "/user/update",
//   asyncHandle(accessMiddleware),
//   authorizationMiddleware(["U", "A"]),
//   asyncHandle(UserController.update)
// );

router.put("/user/update", asyncHandle(UserController.update));

export default router;

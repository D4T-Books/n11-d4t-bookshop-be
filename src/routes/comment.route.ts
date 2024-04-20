"use strict";

import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import CommentController from "../controllers/comment.controller.ts";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.ts";
import { accessMiddleware } from "../middlewares/access.middleware.ts";

const router = express.Router();

router.post(
  "/comment/add",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(CommentController.createComment)
);

router.post(
  "/comment/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["U", "A"]),
  asyncHandle(CommentController.getComments)
);

export default router;

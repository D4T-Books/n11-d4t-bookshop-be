"use strict";

import express from "express";
import asyncHandle from "../../helpers/asyncHandle.ts";
import CommentController from "./../../controllers/comment.controller";

const router = express.Router();

router.post(
  "/comment/create-comment",
  asyncHandle(CommentController.createComment)
);

export default router;

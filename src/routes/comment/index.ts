"use strict";

import express from "express";
import asyncHandle from "../../helpers/asyncHandle.ts";
import CommentController from "./../../controllers/comment.controller";

const router = express.Router();

router.post("/comment/add", asyncHandle(CommentController.createComment));

router.post("/comment/list", asyncHandle(CommentController.getComments));

export default router;

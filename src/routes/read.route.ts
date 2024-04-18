import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import ReadController from "../controllers/read.controller.ts";

const router = express.Router();

router.post("/read", asyncHandle(ReadController.readEachPage));
export default router;

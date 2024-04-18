import express from "express";
import asyncHandle from "../helpers/asyncHandle.ts";
import UserController from "../controllers/user.controller.ts";

const router = express.Router();

router.get("/user/list", asyncHandle(UserController.getAllUser));
router.get("/user/getByUsername", asyncHandle(UserController.getByUsername));
router.get("/user/getById", asyncHandle(UserController.getById));

router.get(
  "/user/deleteByUsername",
  asyncHandle(UserController.deleteUserByUsername)
);
router.get("/user/deleteById", asyncHandle(UserController.deleteUserById));

router.put("/user/update", asyncHandle(UserController.update));

export default router;

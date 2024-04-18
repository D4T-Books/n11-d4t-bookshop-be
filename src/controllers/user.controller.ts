import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import { UserService } from "../services/index.ts";

class UserController {
  static getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get all user success!",
      metadata: await UserService.getListUser(),
    }).send(res);
  };
  static getByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get user by username success!",
      metadata: await UserService.getUserByUsername(req.body),
    }).send(res);
  };

  static getById = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get user by id success!",
      metadata: await UserService.getUserById(req.body),
    }).send(res);
  };

  static deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Delete user by id success!",
      metadata: await UserService.deleteUserByUserID(req.body),
    }).send(res);
  };

  static deleteUserByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Delete user by id success!",
      metadata: await UserService.deleteUserByUsername(req.body),
    }).send(res);
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Updated user's information success!",
      metadata: await UserService.update(req.body),
    }).send(res);
  };
}

export default UserController;

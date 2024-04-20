import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import { AccessService } from "../services/index.ts";

class AccessController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Register success!",
      metadata: await AccessService.register(req.body),
    }).send(res);
  };

  static loginByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Login success!",
      metadata: await AccessService.loginByUsername(req.body, res),
    }).send(res);
  };

  static loginByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Login success!",
      metadata: await AccessService.loginByEmail(req.body, res),
    }).send(res);
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Logout success!",
      metadata: await AccessService.logout(req.body),
    }).send(res);
  };

  static refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get new token success!",
      metadata: await AccessService.refreshToken(req.body),
    }).send(res);
  };
}

export default AccessController;

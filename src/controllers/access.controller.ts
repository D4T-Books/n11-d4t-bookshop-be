import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import AccessService from "../services/access/access.service.ts";

class AccessController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Register success!",
      metadata: await AccessService.register(req.body),
    }).send(res);
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Login success!",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Logout success!",
      metadata: await AccessService.logout(),
    }).send(res);
  };
}

export default AccessController;

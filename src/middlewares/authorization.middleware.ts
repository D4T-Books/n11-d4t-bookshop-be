import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../responses/error.response";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authorizationMiddleware = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRoles: string[] = req.user.roles || [];
    // console.log("userRoles :>> ", userRoles);
    const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasPermission) {
      throw new ForbiddenError("Không có quyền truy cập!");
    }

    next();
  };
};

export { authorizationMiddleware };

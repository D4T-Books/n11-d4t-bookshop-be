import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "../responses/error.response";
import { isTokenInBlackList } from "./helper.middleware";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const { verify } = jwt;

const accessMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.slice(7);

  if (!token || (await isTokenInBlackList(token))) {
    throw new ForbiddenError("Token không hợp lệ!");
  }

  try {
    const key: any = process.env.JWT_KEY;
    const decoded: any = verify(token, key);

    // Kiểm tra thời gian hết hạn của token
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp <= currentTime) {
      return res.status(401).json({ message: "Token đã hết hạn." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export { accessMiddleware };

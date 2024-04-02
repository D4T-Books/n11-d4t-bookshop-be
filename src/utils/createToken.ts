// createToken.ts

import jwt from "jsonwebtoken";
import { ForbiddenError } from "../responses/error.response";
const { sign, verify } = jwt;

const createTokenPair = async (payload: any) => {
  try {
    const keySecret: any = process.env.JWT_KEY;

    const accessToken = sign(payload, keySecret, {
      expiresIn: "2 days",
    });

    const refreshToken = sign(payload, keySecret, {
      expiresIn: "15 days",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("ERROR: Token creation failed!", error);
    throw error;
  }
};

const verifyJWT = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const keySecret: string | undefined = process.env.JWT_KEY;
    if (!keySecret) {
      reject(new ForbiddenError("Không tìm thấy JWT_KEY!"));
      return;
    }

    verify(token, keySecret, (error: any, decoded: any) => {
      if (error) {
        reject(new ForbiddenError(`Token không hợp lệ (${error.message})!`));
      } else {
        // console.log("decoded :>> ", decoded);
        resolve(decoded);
      }
    });
  });
};

export { createTokenPair, verifyJWT };

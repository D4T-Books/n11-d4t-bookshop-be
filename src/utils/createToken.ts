// createToken.ts

import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

const createTokenPair = async (payload: any, keySecret: any) => {
  try {
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

const verifyJWT = async (token: string, keySecret: string) => {
  return verify(token, keySecret);
};

export { createTokenPair, verifyJWT };

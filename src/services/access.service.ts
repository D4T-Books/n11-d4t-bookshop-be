import logger from "../configs/logger.config.ts";
import { queryToDatabase } from "../configs/mysql2.config.ts";
import { hashFunction, compareFunction } from "../helpers/bcryptHandle.ts";
import { isTokenInBlackList } from "../middlewares/helper.middleware.ts";
import {
  ConflictRequestError,
  AuthFailureError,
  BadRequestError,
} from "../responses/error.response.ts";
import { createTokenPair, verifyJWT } from "../utils/createToken.ts";
import { pickData } from "../utils/pick.ts";
import {
  addTokenToBlackList,
  isExistEmail,
  isExistUsername,
} from "./access.helper.service.ts";
import { Request, Response } from "express";

type RegisterParams = {
  fullname: string;
  password: string;
  email: string;
};

type LoginByUsernameParams = {
  username: string;
  password: string;
};

type LoginByEmailParams = {
  email: string;
  password: string;
};

type RefreshParams = {
  username: string;
  refreshToken: string;
};

class AccessService {
  static register = async ({
    email,
    fullname,
    password,
  }: RegisterParams): Promise<Record<string, any>> => {
    logger.info(`{ email, fullname,password } :>> `, {
      email,
      fullname,
      password,
    });

    if (await isExistEmail(email))
      throw new ConflictRequestError("Email đã được sử dụng!");

    const username = email.trim().split("@")[0];
    const hashedPassword = await hashFunction(password);

    const query1 = `INSERT INTO users (Username, Password, Email, Fullname) VALUES (?,?,?,?)`;
    await queryToDatabase(query1, [
      username,
      hashedPassword,
      email.trim(),
      fullname,
    ]);

    const query2 = `SELECT * FROM users WHERE Username = ? AND Email = ?`;
    const [newUser] = await queryToDatabase(query2, [username, email.trim()]);

    if (newUser.length === 0) {
      throw new BadRequestError("Có lỗi trong quá trình tạo tài khoản!");
    }

    return {
      user: pickData({
        fields: ["UserID", "Username", "Email", "Fullname", "Address", "coins"],
        object: newUser[0],
      }),
    };
  };

  static loginByUsername = async (
    { username, password }: LoginByUsernameParams,
    res: Response
  ): Promise<any> => {
    logger.info(`{ username, password } :>> `, { username, password });
    if (!(await isExistUsername(username))) {
      throw new AuthFailureError("Không tìm thấy tài khoản!");
    }

    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [user] = await queryToDatabase(query1, [username]);

    if (
      user.length === 0 ||
      !(await compareFunction(password, user[0].Password))
    )
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! Tạo tokens
    const tokens = await createTokenPair({
      Username: user[0].Username,
      roles: [user[0].Roles],
    });

    return {
      user: pickData({
        fields: [
          "UserID",
          "Username",
          "FullName",
          "Email",
          "Address",
          "coins",
          "Roles",
        ],
        object: user[0],
      }),
      tokens,
    };
  };

  static loginByEmail = async (
    { email, password }: LoginByEmailParams,
    res: Response
  ): Promise<any> => {
    logger.info(`{ email, password } :>> `, { email, password });

    //! Kiểm tra thông tin đăng nhập
    if (!(await isExistEmail(email))) {
      throw new AuthFailureError("Không tìm thấy tài khoản!");
    }

    const query1 = `SELECT * FROM users WHERE Email = ? AND isDeleted = 0`;
    const [user] = await queryToDatabase(query1, [email]);

    if (
      user.length === 0 ||
      !(await compareFunction(password, user[0].Password))
    )
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! Tạo tokens
    const tokens = await createTokenPair({
      Username: user[0].Username,
      roles: [user[0].Roles],
    });

    return {
      user: pickData({
        fields: [
          "UserID",
          "Username",
          "FullName",
          "Email",
          "Address",
          "coins",
          "Roles",
        ],
        object: user[0],
      }),
      tokens,
    };
  };

  static logout = async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }): Promise<any> => {
    if (accessToken.trim() !== "") {
      await addTokenToBlackList(accessToken.trim());
    }
    if (refreshToken.trim() !== "") {
      await addTokenToBlackList(refreshToken.trim());
    }
    return {
      message: "Đăng xuất thành công!",
    };
  };

  //! refreshToken
  static refreshToken = async ({
    refreshToken,
  }: RefreshParams): Promise<any> => {
    if (await isTokenInBlackList(refreshToken)) {
      throw new AuthFailureError("Token không hợp lệ! Vui lòng đăng nhập lại!");
    }

    //!
    const decoded = await verifyJWT(refreshToken);

    if (!(await isExistUsername(decoded.Username))) {
      throw new AuthFailureError("Không tìm thấy tài khoản!");
    }

    //! Tạo tokens
    const dataToken = {
      Username: decoded.Username,
      roles: decoded.roles,
    };
    await addTokenToBlackList(refreshToken.trim());

    const tokens = await createTokenPair(dataToken);

    return {
      username: decoded.Username,
      newTokens: tokens,
    };
  };
}

export default AccessService;

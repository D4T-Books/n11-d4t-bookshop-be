import { queryToDatabase } from "../configs/mysql2.config.ts";
import { hashFunction, compareFunction } from "../helpers/bcryptHandle.ts";
import {
  ConflictRequestError,
  AuthFailureError,
  BadRequestError,
} from "../responses/error.response.ts";
import { createSession, isExpiredSession } from "../utils/createSession.ts";
import { createTokenPair, verifyJWT } from "../utils/createToken.ts";
import { currentTimestamp } from "../utils/getCurrentTimestamp.ts";
import { pickData } from "../utils/pick.ts";
import {
  isExistEmail,
  isExistUserSession,
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
    // Kiểm tra thông tin người dùng
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

    // Tạo sessionID
    const sessionID = createSession();

    const AGE = 3 * 3600; // 3 hours

    let query2 = `INSERT INTO sessions (sessionID, expiredAt, UserID) VALUES (?,?,?)`;
    if (await isExistUserSession(user[0].UserID)) {
      query2 = `UPDATE sessions SET sessionID =?, expiredAt =?, status=1 WHERE UserID =?`;
    }
    await queryToDatabase(query2, [
      sessionID,
      currentTimestamp + AGE,
      user[0].UserID,
    ]);

    // Trả về thông tin người dùng
    res.cookie("session", `${sessionID}`, {
      maxAge: 3600,
      httpOnly: true,
      partitioned: true,
      sameSite: true,
      secure: true,
      path: "/",
    });

    return {
      user: pickData({
        fields: ["UserID", "Username", "Email", "Fullname", "Address", "coins"],
        object: user[0],
      }),
    };
  };

  static loginByEmail = async (
    { email, password }: LoginByEmailParams,
    res: Response
  ): Promise<any> => {
    // Kiểm tra thông tin người dùng
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

    // Tạo sessionID
    const sessionID = createSession();

    const AGE = 3 * 3600; // 3 hours

    let query2 = `INSERT INTO sessions (sessionID, expiredAt, UserID) VALUES (?,?,?)`;
    if (await isExistUserSession(user[0].UserID)) {
      query2 = `UPDATE sessions SET sessionID =?, expiredAt =?, status=1 WHERE UserID =?`;
    }
    await queryToDatabase(query2, [
      sessionID,
      currentTimestamp + AGE,
      user[0].UserID,
    ]);

    // Trả về thông tin người dùng

    res.cookie("session", `${sessionID}`, {
      maxAge: 3600,
      httpOnly: true,
      partitioned: true,
      sameSite: true,
      secure: true,
      path: "/",
    });

    return {
      user: pickData({
        fields: ["UserID", "Username", "Email", "Fullname", "Address", "coins"],
        object: user[0],
      }),
    };
  };

  static logout = async (req: Request, res: Response): Promise<any> => {
    if (await isExpiredSession(req.cookies.session)) {
      return {};
    }

    let query1 = `UPDATE sessions SET status = 0, expiredAt = 0 WHERE sessionID = ?`;

    await queryToDatabase(query1, [req.cookies.session]);

    //
    res.cookie("session", "", {
      maxAge: 0,
    });
    return {
      message: "Đăng xuất thành công!",
    };
  };

  static refreshToken = async ({
    username,
    refreshToken,
  }: RefreshParams): Promise<any> => {
    /*
      1. check username co ton tai khong
      2. check token co trong backlish khong
      3. verify RT 
      4. Tạo cặp token mới
    const tokens = await createTokenPair(dataToken);

      5. đưa vào black list
      6. return tokens
    */

    //  ! 1:
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [user] = await queryToDatabase(query1, [username]);

    if (user.length === 0 || user[0].Username !== username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");
    // ! 2: auto pass

    // ! 3:
    const t = await verifyJWT(refreshToken);
    console.log("t :>> ", t);
    // ! 4: Create tokens's user
    const dataToken = pickData({
      fields: ["Username"],
      object: t,
    });
    const tokens = await createTokenPair(dataToken);

    // ! 5: auto pass

    // ! 6:
    return {
      username: user[0].Username,
      newTokens: tokens,
    };
  };
}

export default AccessService;

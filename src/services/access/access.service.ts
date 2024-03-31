import { queryToDatabase } from "../../configs/mysql2.config.ts";
import * as dotenv from "dotenv";
dotenv.config();
import {
  ConflictRequestError,
  AuthFailureError,
  BadRequestError,
} from "../../responses/error.response.ts";
// import createSession from "../../utils/createSession.ts";
import { createTokenPair } from "../../utils/createToken.ts";
import { pickData } from "../../utils/pick.ts";

type RegisterParams = {
  fullname?: string;
  username?: string;
  password?: string;
  email?: string;
  avatarUrl?: string;
};

type LoginParams = {
  username: string;
  password: string;
  email?: string;
};

class AccessService {
  static register = async ({
    fullname,
    username,
    password,
    email,
    avatarUrl,
  }: RegisterParams): Promise<Record<string, any>> => {
    const query1 = `SELECT * FROM users WHERE Username = ?`;
    const query2 = `SELECT * FROM users WHERE Email = ?`;

    const [existUsername] = await queryToDatabase(query1, [username]);
    const [existEmail] = await queryToDatabase(query2, [email]);

    if (existUsername.length > 0)
      throw new ConflictRequestError("Username đã tồn tại!");
    if (existEmail.length > 0)
      throw new ConflictRequestError("Email đã tồn tại!");

    const query3 = `INSERT INTO users (Username, Password, Email, Fullname) VALUES (?,?,?,?)`;
    const [createUser] = await queryToDatabase(query3, [
      username,
      password,
      email,
      username,
    ]);

    const query4 = `SELECT * FROM users WHERE Username = ? AND Email = ?`;
    const [newUser] = await queryToDatabase(query4, [username, email]);

    if (newUser.length === 0) {
      throw new BadRequestError("Có lỗi trong quá trình tạo tài khoản!");
    }

    return {
      user: pickData({
        fields: [
          "UserID",
          "Username",
          "Email",
          "Fullname",
          "Address",
          "Balance",
        ],
        object: newUser[0],
      }),
    };
  };

  static login = async ({ username, password }: LoginParams): Promise<any> => {
    // check user's information
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [user] = await queryToDatabase(query1, [username]);

    if (user.length === 0 || user[0].Password !== password)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    // Create tokens's user
    const dataToken = pickData({
      fields: ["Username", "Email", "Roles", "isDeleted"],
      object: user[0],
    });
    const tokens = await createTokenPair(dataToken, process.env.JWT_KEY);

    // Return user data
    return {
      user: pickData({
        fields: [
          "UserID",
          "Username",
          "Email",
          "Fullname",
          "Address",
          "Balance",
        ],
        object: user[0],
      }),
      tokens,
    };
  };

  static logout = async (): Promise<void> => {
    // Thêm kiểu dữ liệu và trả về của hàm nếu cần
  };
}

export default AccessService;

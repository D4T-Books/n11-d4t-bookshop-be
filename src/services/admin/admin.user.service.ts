import { queryToDatabase } from "../../configs/mysql2.config.ts";
import * as dotenv from "dotenv";
dotenv.config();
import {
  AuthFailureError,
  BadRequestError,
} from "../../responses/error.response.ts";
import { TransactionType } from "../../global/index.ts";
import { pickData } from "../../utils/pick.ts";
import { currentTimestamp } from "../../utils/getCurrentTimestamp.ts";
import generateRandomNumber from "../../utils/generateRandomNumber.ts";

type updateUserParams = {
  username: string;
  UserID?: string;
  FullName?: string;
  Gender?: string;
  Birthday?: string;
  phone?: string;
};

class AdminUserService {
  static getListUser = async () => {
    const query1 = `SELECT * FROM users WHERE isDeleted = 0`;
    const [users] = await queryToDatabase(query1, []);

    const dataToReturn = [];
    for (let i = 0; i < users.length; i++) {
      dataToReturn.push(
        pickData({
          fields: [
            "UserID",
            "Username",
            "FullName",
            "Email",
            "Fullname",
            "Gender",
            "Birthday",
            "Address",
            "coins",
            "Roles",
            "UpdatedAt",
          ],
          object: users[i],
        })
      );
    }

    return {
      users: dataToReturn,
    };
  };

  static countUser = async () => {
    const query1 = `SELECT COUNT(*) AS totalUser FROM users WHERE isDeleted = 0`;
    const [totalUser] = await queryToDatabase(query1, []);

    return {
      totalUser: totalUser[0].totalUser,
    };
  };

  static countBook = async () => {
    const query1 = `SELECT COUNT(*) AS totalBook FROM books WHERE isShowBook = 1`;
    const [totalBook] = await queryToDatabase(query1, []);

    return {
      totalBook: totalBook[0].totalBook,
    };
  };

  static countTransaction = async () => {
    const query1 = `SELECT COUNT(*) AS totalTransaction FROM transactions 
    WHERE DATE(TransactionDate) = CURRENT_DATE`;
    const [totalTransaction] = await queryToDatabase(query1, []);

    return {
      totalTransaction: totalTransaction[0].totalTransaction,
    };
  };

  static getUserById = async ({ UserID }: { UserID: number }) => {
    const query1 = `SELECT * FROM users WHERE UserID = ?`;
    const [user] = await queryToDatabase(query1, [UserID]);

    return {
      user: user[0],
    };
  };

  static getUserByUsername = async ({ Username }: { Username: string }) => {
    const query1 = `SELECT * FROM users WHERE Username = ?`;
    const [user] = await queryToDatabase(query1, [Username]);

    return {
      user: user[0],
    };
  };

  static searchUser = async ({ FullName }: { FullName: string }) => {
    const query1 = `SELECT * FROM users WHERE FullName LIKE '%${FullName}%'`;
    const [users] = await queryToDatabase(query1, []);
    return {
      users,
    };
  };

  static searchComments = async ({ Username }: { Username: string }) => {
    const query1 = `SELECT * FROM comments WHERE Username LIKE '%${Username}%'`;
    console.log("query1 :>> ", query1);
    const [comments] = await queryToDatabase(query1, []);
    return {
      comments,
    };
  };

  static deleteUserByUserID = async ({ UserID }: { UserID: number }) => {
    const query1 = `UPDATE users SET isDeleted = 1 WHERE UserID = ?`;
    const [user] = await queryToDatabase(query1, [UserID]);

    return {
      user: user[0],
    };
  };

  static deleteUserByUsername = async ({ Username }: { Username: string }) => {
    const query1 = `UPDATE users SET isDeleted = 1 WHERE Username = ?`;
    const [user] = await queryToDatabase(query1, [Username]);

    return {
      user: user[0],
    };
  };

  static deleteCommentByID = async ({ ID }: { ID: string }) => {
    const query1 = `UPDATE comments SET isDeleted = 1 WHERE ID = ?`;
    const [comment] = await queryToDatabase(query1, [ID]);

    return {
      comment: comment[0],
    };
  };

  static update = async ({
    username,
    UserID,
    FullName,
    Gender,
    Birthday,
    phone,
  }: updateUserParams): Promise<any> => {
    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [username]);

    if (existUser.length === 0 || existUser[0].Username !== username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! 2. Kiem tra voucherCode co tai khong, neu co thi con thoi han khong
    if (FullName?.trim().length === 0) FullName = existUser[0].FullName;
    if (Gender?.trim().length === 0) Gender = existUser[0].Gender;
    if (Birthday?.trim().length === 0) Birthday = existUser[0].Birthday;
    const query2 = `UPDATE users 
    SET FullName = ?, Gender = ?, Birthday = ?,phone = ?, UpdatedAt = ?
    WHERE Username = ?
    `;

    const [updateUser] = await queryToDatabase(query2, [
      FullName,
      Gender,
      Birthday,
      phone,
      currentTimestamp,
      username,
    ]);

    const query3 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [newUser] = await queryToDatabase(query3, [username]);

    return {
      newUser: pickData({
        fields: [
          "UserID",
          "Username",
          "Email",
          "Fullname",
          "Gender",
          "Birthday",
          "phone",
          "Address",
          "coins",
          "UpdatedAt",
        ],
        object: newUser[0],
      }),
    };
  };
}

export default AdminUserService;

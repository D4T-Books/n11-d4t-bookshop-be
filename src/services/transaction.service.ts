import { queryToDatabase } from "../configs/mysql2.config.ts";
import * as dotenv from "dotenv";
dotenv.config();
import {
  AuthFailureError,
  BadRequestError,
} from "../responses/error.response.ts";
import { TransactionType } from "../global/index.ts";
import { pickData } from "../utils/pick.ts";
import { currentTimestamp } from "../utils/getCurrentTimestamp.ts";
import generateRandomNumber from "../utils/generateRandomNumber.ts";

type addCoinsParams = {
  username: string;
  voucherCode: string;
};

type useCoinsParams = {
  username: string;
  numberOfCoins: string | number;
};

class TransactionService {
  static addCoins = async ({
    username,
    voucherCode,
  }: addCoinsParams): Promise<any> => {
    /*
      1. Kiem tra user co ton tai khong

      2. Kiem tra voucherCode co tai khong, neu co thi con thoi han khong

      3. Tang so luong xu trong bang users

      4. Them lich su giao dich
    */

    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [username]);

    if (existUser.length === 0 || existUser[0].Username !== username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! 2. Kiem tra voucherCode co tai khong, neu co thi con thoi han khong

    const query2 = `SELECT * FROM vouchers WHERE Code = ?`;
    const [existVoucher] = await queryToDatabase(query2, [voucherCode]);

    if (existVoucher.length === 0) {
      throw new AuthFailureError("Mã voucher không hợp lệ hoặc đã hết hạn!");
    }

    const expiryTimeTimestamp = Math.floor(
      new Date(existVoucher[0].ExpiryTime).getTime() / 1000
    );

    if (expiryTimeTimestamp <= currentTimestamp) {
      throw new AuthFailureError("Mã voucher đã hết hạn!");
    }

    //! 3. Tăng số lượng xu trong bảng users
    const query3 = `UPDATE users SET coins = coins + ? WHERE Username = ?`;
    const coinsToAdd = existVoucher[0].Amount;
    await queryToDatabase(query3, [coinsToAdd, username]);

    //! 4. Thêm lịch sử giao dịch vào bảng transactions
    const query4 = `INSERT INTO transactions 
    (UserID, TransactionType, TransactionAmount, tradingCode) 
    VALUES (?, ?, ?, ?)`;

    const tradingCode = generateRandomNumber();

    await queryToDatabase(query4, [
      existUser[0].UserID,
      TransactionType.NAP,
      existVoucher[0].Amount,
      tradingCode,
    ]);

    const query5 = `SELECT * FROM transactions 
    WHERE tradingCode = ?`;
    const [newTransaction] = await queryToDatabase(query5, [tradingCode]);

    return {
      newTransaction,
    };
  };

  static useCoins = async ({
    username,
    numberOfCoins,
  }: useCoinsParams): Promise<any> => {
    /*
      1. Kiem tra user co ton tai khong

      2. Giam so luong xu trong bang users

      3. Them lich su giao dich
    */

    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [username]);

    if (existUser.length === 0 || existUser[0].Username !== username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    if (existUser[0].coins < 0 || existUser[0].coins < numberOfCoins)
      throw new BadRequestError("Tài khoản không đủ xu!");

    //! 2. Giảm số lượng xu trong bảng users
    const query3 = `UPDATE users SET coins = coins - ? WHERE Username = ?`;
    await queryToDatabase(query3, [numberOfCoins, username]);

    //! 3. Thêm lịch sử giao dịch vào bảng transactions
    const query4 = `INSERT INTO transactions 
    (UserID, TransactionType, TransactionAmount, tradingCode) 
    VALUES (?, ?, ?, ?)`;

    const tradingCode = generateRandomNumber();

    await queryToDatabase(query4, [
      existUser[0].UserID,
      TransactionType.PAY,
      numberOfCoins,
      tradingCode,
    ]);

    const query5 = `SELECT * FROM transactions 
    WHERE tradingCode = ?`;
    const [newTransaction] = await queryToDatabase(query5, [tradingCode]);

    const query6 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [userAfterPay] = await queryToDatabase(query6, [username]);

    return {
      user: pickData({
        fields: ["UserID", "Username", "Email", "Fullname", "Address", "coins"],
        object: userAfterPay[0],
      }),
      newTransaction: newTransaction[0],
    };
  };

  static getTransactionByUsername = async ({
    username,
  }: {
    username: string;
  }): Promise<any> => {
    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [username]);

    if (existUser.length === 0 || existUser[0].Username !== username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! 2. Get 10 latest transaction
    const query2 = `SELECT * FROM transactions WHERE UserID = ? LIMIT 10`;
    const [transactions] = await queryToDatabase(query2, [existUser[0].UserID]);

    return {
      transactions,
    };
  };
}

export default TransactionService;

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
  static addCoinsByOrder = async ({
    Username,
    numberOfCoins,
  }: {
    Username: any;
    numberOfCoins: any;
  }) => {
    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [Username]);

    if (existUser.length === 0 || existUser[0].Username !== Username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! 2. Tăng số lượng xu trong bảng users
    const numToUpdate = Number(numberOfCoins) + existUser[0].coins;
    console.log("numToUpdate :>> ", numToUpdate);
    const query3 = `UPDATE users SET coins = ? WHERE Username = ?`;

    await queryToDatabase(query3, [numToUpdate, Username]);

    //! 3. Thêm lịch sử giao dịch vào bảng transactions
    const query4 = `INSERT INTO transactions 
    (UserID, TransactionType, TransactionAmount, tradingCode) 
    VALUES (?, ?, ?, ?)`;

    const tradingCode = generateRandomNumber();

    await queryToDatabase(query4, [
      existUser[0].UserID,
      TransactionType.NAP,
      numberOfCoins,
      tradingCode,
    ]);

    const query5 = `SELECT * FROM transactions 
    WHERE tradingCode = ?`;
    const [newTransaction] = await queryToDatabase(query5, [tradingCode]);

    return {
      Username,
      newTransaction,
    };
  };

  static addCoins = async (
    { Username }: { Username: string },
    { voucherCode }: addCoinsParams
  ): Promise<any> => {
    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [Username]);

    if (existUser.length === 0 || existUser[0].Username !== Username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! 2. Kiem tra voucherCode co tai khong, neu co thi con thoi han khong

    const query2 = `SELECT * FROM vouchers WHERE Code = ?`;
    const [existVoucher] = await queryToDatabase(query2, [voucherCode]);

    if (existVoucher.length === 0) {
      throw new BadRequestError("Mã voucher không hợp lệ hoặc đã hết hạn!");
    }

    const expiryTimeTimestamp = Math.floor(
      new Date(existVoucher[0].ExpiryTime).getTime() / 1000
    );

    if (expiryTimeTimestamp <= currentTimestamp) {
      throw new BadRequestError("Mã voucher đã hết hạn!");
    }

    //! 3. Tăng số lượng xu trong bảng users
    const query3 = `UPDATE users SET coins = coins + ? WHERE Username = ?`;
    const coinsToAdd = existVoucher[0].Amount;
    await queryToDatabase(query3, [coinsToAdd, Username]);

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
      Username,
      newTransaction,
    };
  };

  static useCoins = async (
    { Username }: { Username: string },
    { numberOfCoins }: useCoinsParams
  ): Promise<any> => {
    /*
      1. Kiem tra user co ton tai khong

      2. Giam so luong xu trong bang users

      3. Them lich su giao dich
    */

    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [Username]);

    if (existUser.length === 0 || existUser[0].Username !== Username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    if (existUser[0].coins < 0 || existUser[0].coins < numberOfCoins)
      throw new BadRequestError("Tài khoản không đủ xu!");

    //! 2. Giảm số lượng xu trong bảng users
    const query3 = `UPDATE users SET coins = coins - ? WHERE Username = ?`;
    await queryToDatabase(query3, [numberOfCoins, Username]);

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
    const [userAfterPay] = await queryToDatabase(query6, [Username]);

    return {
      user: pickData({
        fields: ["UserID", "Username", "Email", "Fullname", "Address", "coins"],
        object: userAfterPay[0],
      }),
      newTransaction: newTransaction[0],
    };
  };

  static getListTransactionByUsername0 = async ({
    Username,
  }: {
    Username: string;
  }): Promise<any> => {
    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [Username]);

    if (existUser.length === 0 || existUser[0].Username !== Username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! 2. Get 10 latest transaction
    const query2 = `SELECT * FROM transactions WHERE UserID = ? LIMIT 10`;
    const [transactions] = await queryToDatabase(query2, [existUser[0].UserID]);

    return {
      transactions,
    };
  };

  static async getListTransactionByUsername(
    {
      Username,
    }: {
      Username: string;
    },
    { Page = 1, Limit = 10 }
  ): Promise<{ transactions: any[]; coins: number; total: number }> {
    // 1. Check if user exists
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [Username]);

    if (existUser.length === 0 || existUser[0].Username !== Username) {
      throw new AuthFailureError("Không tìm thấy tài khoản!");
    }

    // 2. Calculate offset based on page and limit
    const offset = (Page - 1) * Limit;

    // 3. Retrieve transactions with pagination
    const query2 = `
      SELECT *
      FROM transactions
      WHERE UserID = ?
      ORDER BY TransactionDate DESC
      LIMIT ?, ?`;
    const [transactions] = await queryToDatabase(query2, [
      existUser[0].UserID,
      offset,
      Limit,
    ]);

    // 4. Get total transaction count (optional but recommended)
    const query3 = `SELECT COUNT(*) AS total FROM transactions WHERE UserID = ?`;
    const [[{ total }]] = await queryToDatabase(query3, [existUser[0].UserID]);

    return {
      transactions,
      coins: existUser[0].coins,
      total: total || 0, // Handle potential null value from query3
    };
  }
  static async getCurrentCoins({
    Username,
  }: {
    Username: string;
  }): Promise<{ coins: number }> {
    // 1. Check if user exists
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [Username]);

    if (existUser.length === 0 || existUser[0].Username !== Username) {
      throw new AuthFailureError("Không tìm thấy tài khoản!");
    }

    return {
      coins: existUser[0].coins,
    };
  }
}

export default TransactionService;

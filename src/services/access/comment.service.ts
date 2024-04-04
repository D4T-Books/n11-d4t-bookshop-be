import { queryToDatabase } from "../../configs/mysql2.config.ts";
import * as dotenv from "dotenv";
dotenv.config();
import {
  AuthFailureError,
  BadRequestError,
} from "../../responses/error.response.ts";
import { pickData } from "../../utils/pick.ts";
import { currentTimestamp } from "./../../utils/getCurrentTimestamp";
import generateRandomNumber from "../../utils/generateRandomNumber.ts";

type addCommentParams = {
  username: string;
  BookID: string;
  Content: string;
};

class CommentService {
  static createComment = async ({
    username,
    BookID,
    Content,
  }: addCommentParams): Promise<any> => {
    /*
      1. Kiem tra user co ton tai khong

      2. Kiem tra sách co ton tai khong

      3. Tạo comment mới

      4. Return ket qua
    */

    //! 1. Kiem tra user co ton tai khong
    const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
    const [existUser] = await queryToDatabase(query1, [username]);

    if (existUser.length === 0 || existUser[0].Username !== username)
      throw new AuthFailureError("Không tìm thấy tài khoản!");

    //! 2. Kiem tra sách co ton tai khong
    const query2 = `SELECT * FROM books WHERE BookID = ?`;
    const [existBook] = await queryToDatabase(query2, [BookID]);

    if (existBook.length === 0)
      throw new AuthFailureError(
        "Sách này không còn tồn tại! Không thể bình luận!"
      );

    //! 3. Thêm comment mới vào bảng comments
    const CommentCode = generateRandomNumber();

    const query4 = `INSERT INTO comments 
    (UserID, BookID, Content, CommentCode) 
    VALUES (?, ?, ?, ?)`;

    await queryToDatabase(query4, [
      existUser[0].UserID,
      BookID,
      Content,
      CommentCode,
    ]);

    const query5 = `SELECT * FROM comments 
    WHERE CommentCode = ?`;
    const [newComment] = await queryToDatabase(query5, [CommentCode]);

    return {
      newComment: newComment[0],
    };
  };
}

export default CommentService;

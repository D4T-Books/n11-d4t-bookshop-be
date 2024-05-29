import { queryToDatabase } from "../../configs/mysql2.config.ts";

import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} from "../../responses/error.response.ts";
import { currentTimestamp } from "../../utils/getCurrentTimestamp.ts";
import { pickData } from "../../utils/pick.ts";
import stringConversion from "../../utils/stringConversion.ts";
import {
  isExistBook,
  isExistBookmark,
  isExistUsername,
} from "../access.helper.service.ts";

type searchByNameParams = {
  title: string;
};
type addBookParams = {
  Title: string;
  title_for_search: string;
  CoverURL: string;
  Author: string;
  Description: string;
  Categories: string;
  PageNumber: number;
  Price: number;
};

//  books (Title, title_for_search, CoverURL, Author, Description, Categories, PageNumber, Price)

class AdminBookService {
  static getAllBook = async (): Promise<any> => {
    const query1 = `
    SELECT *
    FROM books 
    WHERE isShowBook = 1`;
    const [books] = await queryToDatabase(query1, []);

    return {
      books,
    };
  };
  // ! ADMIN ONLY
  static addBook = async ({
    Title,
    title_for_search,
    CoverURL,
    Author,
    Description,
    Categories,
    PageNumber,
    Price,
  }: addBookParams): Promise<any> => {
    if (await isExistBook(title_for_search)) {
      throw new ConflictRequestError("Tên sách đã tồn tại!");
    }
    const query1 = `INSERT INTO books (Title, title_for_search, CoverURL, Author, Description, Categories, PageNumber, Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    await queryToDatabase(query1, [
      Title,
      title_for_search,
      CoverURL,
      Author,
      Description,
      Categories,
      PageNumber,
      Price,
    ]);

    const query2 = `SELECT * FROM books WHERE title_for_search = ?`;
    const [newBook] = await queryToDatabase(query2, [title_for_search]);

    return {
      newBook: newBook[0],
    };
  };

  static updateBook = async ({
    Title,
    title_for_search,
    CoverURL,
    Author,
    language,
    Description,
    Categories,
    PageNumber,
    Price,
  }: {
    Title: string;
    title_for_search: string;
    CoverURL: string;
    Author: string;
    language: string;
    Description: string;
    Categories: string;
    PageNumber: string;
    Price: string;
  }): Promise<any> => {
    // Kiểm tra xem sách có tồn tại không trước khi cập nhật
    if (!(await isExistBook(title_for_search))) {
      throw new NotFoundError("Không tìm thấy sách!");
    }

    // Câu truy vấn cập nhật thông tin sách
    const query = `
      UPDATE books
      SET Title = ?,
          CoverURL = ?,
          Author = ?,
          Description = ?,
          language = ?,
          Categories = ?,
          PageNumber = ?,
          Price = ?
      WHERE title_for_search = ?;
    `;

    // Thực hiện câu truy vấn
    await queryToDatabase(query, [
      Title,
      CoverURL,
      Author,
      Description,
      language,
      Categories,
      PageNumber,
      Price,
      title_for_search,
    ]);

    // Trả về thông tin sách đã được cập nhật
    const updatedBookQuery = `SELECT * FROM books WHERE title_for_search = ?`;
    const [updatedBook] = await queryToDatabase(updatedBookQuery, [
      title_for_search,
    ]);

    return {
      updatedBook: updatedBook[0],
    };
  };

  // ! ADMIN ONLY
  static toggleShowBook = async ({
    title_for_search,
  }: {
    title_for_search: string;
  }): Promise<any> => {
    if (!(await isExistBook(title_for_search))) {
      throw new BadRequestError("Truy vấn đến sách không tồn tại!");
    }
    const query1 = `SELECT * FROM books WHERE title_for_search = ?`;

    let [book] = await queryToDatabase(query1, [title_for_search]);

    if (book.length > 0 && book[0].isShowBook == 1) {
      await queryToDatabase(
        "UPDATE books SET isShowBook = 0 WHERE title_for_search = ?",
        [title_for_search]
      );
    } else if (book.length > 0 && book[0].isShowBook == 0) {
      await queryToDatabase(
        "UPDATE books SET isShowBook = 1 WHERE title_for_search = ?",
        [title_for_search]
      );
    }

    [book] = await queryToDatabase(query1, [title_for_search]);

    return {
      book: book[0],
    };
  };

  static getVoucherList = async (): Promise<any> => {
    const query = "SELECT * FROM vouchers";

    const [vouchers] = await queryToDatabase(query, []);
    return {
      vouchers,
    };
  };

  static createVoucher = async ({
    Code,
    Amount,
    ExpiryTime,
  }: {
    Code: string;
    Amount: string;
    ExpiryTime: string;
  }): Promise<any> => {
    const query = `
      INSERT INTO vouchers (Code, Amount, ExpiryTime) 
      VALUES(?, ?, DATE_ADD(NOW(), INTERVAL ? HOUR))`;

    try {
      await queryToDatabase(query, [Code, Amount, ExpiryTime]);
      return {
        message: "Tạo voucher thành công",
      };
    } catch (error) {
      console.error("Error inserting voucher: ", error);
      return {
        message: "Có lỗi xảy ra khi tạo voucher",
        error,
      };
    }
  };

  static deleteVoucher = async ({
    VoucherID,
  }: {
    VoucherID: string;
  }): Promise<any> => {
    const query = "DELETE FROM vouchers WHERE VoucherID = ?";

    await queryToDatabase(query, [VoucherID]);
    return {
      message: "Xóa voucher thành công",
    };
  };

  static updateVoucher = async ({
    Amount,
    VoucherID,
  }: {
    Amount: string;
    VoucherID: string;
  }): Promise<any> => {
    const query = "UPDATE vouchers SET Amount = ? WHERE VoucherID = ?";

    await queryToDatabase(query, [Amount, VoucherID]);
    return {
      message: "Xóa voucher thành công",
    };
  };

  static searchVoucher = async ({ Code }: { Code: string }): Promise<any> => {
    const query = `SELECT * FROM vouchers WHERE Code LIKE '%${Code}%'`;

    const [vouchers] = await queryToDatabase(query, []);
    return {
      vouchers,
    };
  };

  static searchVoucherByID = async ({
    VoucherID,
  }: {
    VoucherID: string;
  }): Promise<any> => {
    const query = `SELECT * FROM vouchers WHERE VoucherID = ?`;

    const [voucher] = await queryToDatabase(query, [VoucherID]);
    return {
      voucher: voucher[0],
    };
  };
}

export default AdminBookService;

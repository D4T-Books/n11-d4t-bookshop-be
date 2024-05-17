import { queryToDatabase } from "../../configs/mysql2.config.ts";

import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
} from "../../responses/error.response.ts";
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

class AdminService {
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
}

export default AdminService;

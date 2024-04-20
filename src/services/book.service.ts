import { queryToDatabase } from "../configs/mysql2.config.ts";

import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
} from "../responses/error.response.ts";
import { pickData } from "../utils/pick.ts";
import {
  isExistBook,
  isExistBookmark,
  isExistUsername,
} from "./access.helper.service.ts";

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

class BookService {
  //!
  static searchByName = async ({ title }: searchByNameParams): Promise<any> => {
    const query1 = `SELECT * FROM books WHERE Title LIKE '%Pride and Prejudice%'`;
    const [books] = await queryToDatabase(query1, [title]);

    return {
      books,
    };
  };

  static searchByCategories = async ({
    Categories,
  }: {
    Categories: string;
  }): Promise<any> => {
    const query1 = `SELECT * FROM books WHERE Categories LIKE '%Classic%'`;
    console.log("query1 :>> ", query1);
    const [books] = await queryToDatabase(query1, [Categories]);

    return {
      books,
    };
  };

  static searchTop5BookByViews = async (): Promise<any> => {
    const query1 = `SELECT * FROM books ORDER BY Views DESC LIMIT 5`;
    const [books] = await queryToDatabase(query1, []);
    console.log("books :>> ", books);
    return {
      books,
    };
  };

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

  static createBookmark = async ({
    title_for_search,
    Username,
    PageNumber,
  }: {
    title_for_search: string;
    Username: string;
    PageNumber: number;
  }): Promise<any> => {
    if (!(await isExistBook(title_for_search))) {
      throw new BadRequestError("Sách không tồn tại!");
    }

    if (!(await isExistUsername(Username))) {
      throw new BadRequestError("Người dùng không tồn tại!");
    }
    const query1 = `SELECT * FROM books WHERE title_for_search = ?`;

    let [book] = await queryToDatabase(query1, [title_for_search]);

    if (book[0].PageNumber < PageNumber) {
      throw new BadRequestError("Số trang không hợp lệ!");
    }

    if (await isExistBookmark(title_for_search)) {
      const query = `UPDATE bookmarks SET PageNumber = ? WHERE title_for_search = ? AND Username = ?`;

      await queryToDatabase(query, [PageNumber, title_for_search, Username]);
    } else {
      const query2 = `INSERT INTO bookmarks (title_for_search, Username, PageNumber) VALUES (?,?,?)`;
      await queryToDatabase(query2, [title_for_search, Username, PageNumber]);
    }

    const query3 = `SELECT * FROM bookmarks WHERE title_for_search = ? ORDER BY id DESC`;

    const [newBookmark] = await queryToDatabase(query3, [title_for_search]);
    return {
      newBookmark: newBookmark[0],
    };
  };
}

export default BookService;

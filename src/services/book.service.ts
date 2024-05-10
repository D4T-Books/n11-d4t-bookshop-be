import { queryToDatabase } from "../configs/mysql2.config.ts";

import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
} from "../responses/error.response.ts";
import { pickData } from "../utils/pick.ts";
import stringConversion from "../utils/stringConversion.ts";
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
    const query1 = `
    SELECT * 
    FROM books 
    WHERE title_for_search 
    LIKE '%${stringConversion(title)}%' `;

    const [books] = await queryToDatabase(query1, [title]);

    return {
      books,
    };
  };

  static searchByTagName = async ({
    title,
  }: searchByNameParams): Promise<any> => {
    const query1 = `
    SELECT * 
    FROM books 
    WHERE title_for_search 
    LIKE '%${title}%' `;

    const [books] = await queryToDatabase(query1, [title]);

    return {
      book: books[0],
    };
  };

  static searchByCategories = async ({
    category,
  }: {
    category: string;
  }): Promise<any> => {
    const category_for_search =
      category.trim() === "" ? "zzz" : category.trim();
    const query1 = `
    SELECT * 
    FROM books 
    WHERE Categories 
    LIKE '%${category_for_search}%' 
    LIMIT 10;`;

    const [books] = await queryToDatabase(query1, []);

    return {
      books,
    };
  };

  // ! Lấy 5 sách được xem nhiều nhất
  static searchTop5BookByViews = async (): Promise<any> => {
    const query1 = `
    SELECT * 
    FROM books 
    WHERE isShowBook = 1 
    ORDER BY Views DESC LIMIT 6`;

    const [books] = await queryToDatabase(query1, []);

    return {
      books,
    };
  };

  static searchTop6NewBooks = async (): Promise<any> => {
    const query1 = `
    SELECT * 
    FROM books 
    WHERE isShowBook = 1 
    ORDER BY publication_year DESC LIMIT 6`;

    const [books] = await queryToDatabase(query1, []);
    return {
      books,
    };
  };

  static searchTop6FreeBooks = async (): Promise<any> => {
    const query1 = `
    SELECT * 
    FROM books 
    WHERE isShowBook = 1 AND Price = 0
    ORDER BY publication_year DESC LIMIT 6`;

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
    const query1 = `
    SELECT * 
    FROM books 
    WHERE title_for_search = ?`;

    let [book] = await queryToDatabase(query1, [title_for_search]);

    if (book[0].PageNumber < PageNumber) {
      throw new BadRequestError("Số trang không hợp lệ!");
    }

    if (await isExistBookmark(title_for_search)) {
      const query = `
      UPDATE bookmarks 
      SET PageNumber = ? 
      WHERE title_for_search = ? AND Username = ?`;

      await queryToDatabase(query, [PageNumber, title_for_search, Username]);
    } else {
      const query2 = `
      INSERT INTO bookmarks (title_for_search, Username, PageNumber) 
      VALUES (?,?,?)`;
      await queryToDatabase(query2, [title_for_search, Username, PageNumber]);
    }

    const query3 = `
    SELECT * 
    FROM bookmarks 
    WHERE title_for_search = ? 
    ORDER BY id DESC`;

    const [newBookmark] = await queryToDatabase(query3, [title_for_search]);
    return {
      newBookmark: newBookmark[0],
    };
  };

  static getBookmarksByTitle = async (
    { Username }: { Username: string },
    { title_for_search }: { title_for_search: string }
  ): Promise<any> => {
    const query = `
      SELECT * 
      FROM bookmarks 
      WHERE title_for_search = ? AND Username = ?
      ORDER BY id DESC`;

    const [bookmarks] = await queryToDatabase(query, [
      title_for_search,
      Username,
    ]);
    return {
      bookmarks: bookmarks,
    };
  };

  static getAllBook = async (): Promise<any> => {
    const query1 = `
    SELECT Title, title_for_search, CoverURL 
    FROM books 
    WHERE 1;`;
    const [books] = await queryToDatabase(query1, []);

    return {
      books,
    };
  };

  // ! Cập nhật số lượt xem sách
  static updateBookView = async ({
    title_for_search,
  }: {
    title_for_search: string;
  }): Promise<any> => {
    const query1 = `SELECT * FROM books WHERE title_for_search = ?`;
    let [book] = await queryToDatabase(query1, [title_for_search]);

    if (book.length === 0)
      throw new BadRequestError("Truy vấn đến sách không tồn tại!");

    const query2 = `
    UPDATE books 
    SET Views = ?
    WHERE books.title_for_search = ?`;
    await queryToDatabase(query2, [book[0].Views + 1, title_for_search]);

    [book] = await queryToDatabase(query1, [title_for_search]);

    return {
      new_book: book[0],
    };
  };
}

export default BookService;

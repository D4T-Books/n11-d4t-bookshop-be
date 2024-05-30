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
  CoverURL: string;
  Author: string;
  Description: string;
  Categories: string;
  PageNumber: number;
  Price: number;
  language: string;
};

//  books (Title, title_for_search, CoverURL, Author, Description, Categories, PageNumber, Price)

class BookService {
  //!
  static searchByName = async ({ title }: searchByNameParams): Promise<any> => {
    const query1 = `
    SELECT * 
    FROM books 
    WHERE title_for_search 
    LIKE '%${stringConversion(title)}%' AND isShowBook = 1`;

    const [books] = await queryToDatabase(query1, [title]);

    try {
      const [books] = await queryToDatabase(query1, [title]);
    } catch (error) {
      console.log("error :>> ", error);
    }

    return {
      books,
    };
  };

  static searchByCategory = async ({
    category,
  }: {
    category: string;
  }): Promise<any> => {
    console.log("category :>> ", category);
    const query1 = `
    SELECT * 
    FROM books 
    WHERE Categories 
    LIKE '%${category}%' AND isShowBook = 1`;

    console.log("query1 :>> ", query1);

    try {
      const [books] = await queryToDatabase(query1, [category]);

      return {
        books,
      };
    } catch (error) {
      console.log("error :>> ", error);
      return { books: [] };
    }
  };

  static searchByTagName = async ({
    title,
  }: searchByNameParams): Promise<any> => {
    const query1 = `
    SELECT * 
    FROM books 
    WHERE title_for_search 
    LIKE '%${title}%' AND isShowBook = 1`;

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
    LIKE '%${category_for_search}%' AND isShowBook = 1
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
    CoverURL,
    Author,
    Description,
    Categories,
    PageNumber,
    Price,
    language,
  }: addBookParams): Promise<any> => {
    const title_for_search = stringConversion(Title);
    if (await isExistBook(title_for_search)) {
      throw new ConflictRequestError("Tên sách đã tồn tại!");
    }
    const query1 = `INSERT INTO books (Title, title_for_search, CoverURL, Author, Description, Categories, PageNumber, Price, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    await queryToDatabase(query1, [
      Title,
      title_for_search,
      CoverURL,
      Author,
      Description,
      Categories,
      PageNumber,
      Price,
      language,
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
    try {
      // console.log("title_for_search :>> ", title_for_search);
      if (!(await isExistBook(title_for_search))) {
        throw new BadRequestError("Truy vấn đến sách không tồn tại!");
      }
      const query1 = `SELECT * FROM books WHERE title_for_search = ?`;

      let [book] = await queryToDatabase(query1, [title_for_search]);

      if (book.length > 0 && book[0].isShowBook == 1) {
        console.log("HERE");
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
    } catch (error) {
      console.log("error :>> ", error);
      return {};
    }
  };

  //! Create Bookmarks
  static createBookmark = async ({
    title_for_search,
    Username,
    PageNumber,
    clickPositionY,
  }: {
    title_for_search: string;
    Username: string;
    PageNumber: number;
    clickPositionY: number;
  }): Promise<any> => {
    if (!(await isExistBook(title_for_search))) {
      throw new BadRequestError("Sách không tồn tại!");
    }

    if (!(await isExistUsername(Username))) {
      throw new BadRequestError("Người dùng không tồn tại!");
    }

    const query1 = `
      SELECT PageNumber 
      FROM books 
      WHERE title_for_search = ?`;

    const [book] = await queryToDatabase(query1, [title_for_search]);

    if (!book || book.length === 0 || book[0].PageNumber < PageNumber) {
      throw new BadRequestError("Số trang không hợp lệ!");
    }

    const query2 = `
      SELECT * 
      FROM bookmarks 
      WHERE title_for_search = ? AND Username = ?`;

    const [existingBookmark] = await queryToDatabase(query2, [
      title_for_search,
      Username,
    ]);

    if (existingBookmark && existingBookmark.length > 0) {
      const query3 = `
        UPDATE bookmarks 
        SET PageNumber = ?, clickPositionY = ? 
        WHERE title_for_search = ? AND Username = ?`;

      await queryToDatabase(query3, [
        PageNumber,
        clickPositionY,
        title_for_search,
        Username,
      ]);
    } else {
      const query4 = `
        INSERT INTO bookmarks (title_for_search, Username, PageNumber, clickPositionY) 
        VALUES (?,?,?,?)`;
      await queryToDatabase(query4, [
        title_for_search,
        Username,
        PageNumber,
        clickPositionY,
      ]);
    }

    const query5 = `
      SELECT * 
      FROM bookmarks 
      WHERE title_for_search = ? AND Username = ? 
      ORDER BY id DESC`;

    const [newBookmark] = await queryToDatabase(query5, [
      title_for_search,
      Username,
    ]);

    if (!newBookmark || newBookmark.length === 0) {
      throw new Error("Đã xảy ra lỗi trong quá trình tạo bookmark.");
    }

    console.log("newBookmark :>> ", newBookmark[0]);
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

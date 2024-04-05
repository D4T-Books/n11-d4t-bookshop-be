import { queryToDatabase } from "../../configs/mysql2.config.ts";
import * as dotenv from "dotenv";
dotenv.config();
import {
  AuthFailureError,
  BadRequestError,
} from "../../responses/error.response.ts";
import { pickData } from "../../utils/pick.ts";
import splitPdf from "../../utils/book/split.js";

type searchByNameParams = {
  title: string;
};

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
}

export default BookService;

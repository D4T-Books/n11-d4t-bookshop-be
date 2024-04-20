import { queryToDatabase } from "../configs/mysql2.config.ts";
import fs from "fs";
import path from "path";
import {
  AuthFailureError,
  BadRequestError,
} from "../responses/error.response.ts";
import { pickData } from "../utils/pick.ts";
import { isExistBook, isExistBookID } from "./access.helper.service.ts";

type readParams = {
  title: string;
  page: string;
};

class ReadService {
  static trackingBook = async ({
    UserID,
    BookID,
    isFavourited,
  }: {
    UserID: string;
    BookID: string;
    isFavourited: number;
  }): Promise<any> => {
    const query1 =
      "SELECT * FROM book_tracking WHERE UserID = ? AND BookID = ?";

    if (!(await isExistBookID(BookID))) {
      throw new BadRequestError("Không tìm thấy người dùng!");
    }

    const [track] = await queryToDatabase(query1, [UserID, BookID]);
    if (track.length === 0) {
      const query =
        "INSERT INTO book_tracking (UserID, BookID, isFavourited) VALUES (?, ?, ?)";

      await queryToDatabase(query, [UserID, BookID, isFavourited]);
    }

    // !?
  };
}

export default ReadService;

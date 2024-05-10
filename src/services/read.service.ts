import { queryToDatabase } from "../configs/mysql2.config.ts";
import fs from "fs";
import path from "path";
import {
  AuthFailureError,
  BadRequestError,
} from "../responses/error.response.ts";
import { pickData } from "../utils/pick.ts";
import {
  isExist,
  isExistBook,
  isExistBookID,
} from "./access.helper.service.ts";

type readParams = {
  title: string;
  page: string;
};

class ReadService {
  static trackingBook = async (
    { Username }: { Username: string },
    {
      title_for_search,
    }: {
      title_for_search: string;
    }
  ): Promise<any> => {
    const query1 =
      "SELECT * FROM book_tracking WHERE Username = ? AND title_for_search = ?";

    let [track] = await queryToDatabase(query1, [Username, title_for_search]);

    if (track.length === 0) {
      const query =
        "INSERT INTO book_tracking (Username, title_for_search) VALUES (?, ?)";

      await queryToDatabase(query, [Username, title_for_search]);
    }

    // !?

    [track] = await queryToDatabase(query1, [Username, title_for_search]);

    return {
      track: track[0],
    };
  };
  static trackingFavoriteBook = async (
    { Username }: { Username: string },
    {
      title_for_search,
    }: {
      title_for_search: string;
    }
  ): Promise<any> => {
    const query1 =
      "SELECT * FROM book_favorited WHERE Username = ? AND title_for_search = ?";

    console.log("[Username, title_for_search] :>> ", [
      Username,
      title_for_search,
    ]);
    let [track] = await queryToDatabase(query1, [Username, title_for_search]);

    if (track.length === 0) {
      const query =
        "INSERT INTO book_favorited (Username, title_for_search) VALUES (?, ?)";

      await queryToDatabase(query, [Username, title_for_search]);
    }

    // !?

    [track] = await queryToDatabase(query1, [Username, title_for_search]);
    console.log("track :>> ", track);
    return {
      favorite_tracked: track[0],
    };
  };

  static removeTrackingFavoriteBook = async (
    { Username }: { Username: string },
    {
      title_for_search,
    }: {
      title_for_search: string;
    }
  ): Promise<any> => {
    const query1 =
      "DELETE FROM book_favorited WHERE Username = ? AND title_for_search = ?";

    let [track] = await queryToDatabase(query1, [Username, title_for_search]);

    return {
      track,
    };
  };

  static getTrackingBookList = async ({
    Username,
  }: {
    Username: string;
  }): Promise<any> => {
    const query1 = `SELECT * 
      FROM book_tracking 
      INNER JOIN books ON book_tracking.title_for_search = books.title_for_search
      WHERE Username = ? AND books.isShowBook = 1
      ORDER BY book_tracking.createAt DESC
      `;

    let [trackedList] = await queryToDatabase(query1, [Username]);

    // !?

    return {
      trackedList,
    };
  };

  static getFavoriteTrackedBookList = async ({
    Username,
  }: {
    Username: string;
  }): Promise<any> => {
    const query1 = `SELECT * 
      FROM book_favorited 
      INNER JOIN books ON book_favorited.title_for_search = books.title_for_search
      WHERE Username = ? AND books.isShowBook = 1
      ORDER BY book_favorited.createAt DESC
      `;

    let [trackedList] = await queryToDatabase(query1, [Username]);

    // !?

    return {
      trackedList,
    };
  };
}

export default ReadService;

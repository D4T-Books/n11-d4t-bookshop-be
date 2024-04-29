import { queryToDatabase } from "../configs/mysql2.config";

const isExistUsername = async (username: string) => {
  const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
  const [existUsername] = await queryToDatabase(query1, [username]);

  return existUsername.length !== 0;
};

const isExistEmail = async (email: any) => {
  const query1 = `SELECT * FROM users WHERE Email = ? AND isDeleted = 0`;
  const [existEmail] = await queryToDatabase(query1, [email.toString().trim()]);

  return existEmail.length !== 0;
};

const isExistUserSession = async (UserID: any) => {
  const query1 = `SELECT * FROM sessions WHERE UserID = ?`;
  const [existUserSession] = await queryToDatabase(query1, [UserID]);

  return existUserSession.length !== 0;
};

const isExistBook = async (title_for_search: string) => {
  const query1 = `SELECT * FROM books WHERE title_for_search = ?`;
  const [existBook] = await queryToDatabase(query1, [title_for_search]);

  return existBook.length !== 0;
};

const isExistBookID = async (BookID: string) => {
  const query1 = `SELECT * FROM books WHERE BookID = ?`;
  const [existBook] = await queryToDatabase(query1, [BookID]);

  return existBook.length !== 0;
};

const isExistBookmark = async (title_for_search: string) => {
  const query1 = `SELECT * FROM bookmarks WHERE title_for_search = ?`;
  const [existBookmark] = await queryToDatabase(query1, [title_for_search]);

  return existBookmark.length !== 0;
};

const isExist = async (table: string, fieldName: string, value: any) => {
  const query = `SELECT * FROM ${table} WHERE ${fieldName} = ?`;

  try {
    const [results] = await queryToDatabase(query, [value]);
    return results.length !== 0;
  } catch (error) {
    console.error(`Error checking existence in ${table}:`, error);
    return false;
    // throw new Error("Database error checking existence");
  }
};

const addTokenToBlackList = async (token: string) => {
  const query = `INSERT INTO tokens (token) VALUES (?)`;
  await queryToDatabase(query, [token]);
};

export {
  isExistUsername,
  isExistEmail,
  isExistUserSession,
  isExistBook,
  isExistBookmark,
  isExistBookID,
  addTokenToBlackList,
  isExist,
};

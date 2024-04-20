import { queryToDatabase } from "../configs/mysql2.config";

const isExistUsername = async (username: string) => {
  const query1 = `SELECT * FROM users WHERE Username = ? AND isDeleted = 0`;
  const [existUsername] = await queryToDatabase(query1, [username]);
  if (existUsername.length === 0) return false;
  return true;
};

const isExistEmail = async (email: any) => {
  const query1 = `SELECT * FROM users WHERE Email = ? AND isDeleted = 0`;
  const [existEmail] = await queryToDatabase(query1, [email.toString().trim()]);
  if (existEmail.length === 0) return false;
  return true;
};

const isExistUserSession = async (UserID: any) => {
  const query1 = `SELECT * FROM sessions WHERE UserID = ?`;
  const [existUserSession] = await queryToDatabase(query1, [UserID]);
  if (existUserSession.length === 0) return false;
  return true;
};

const isExistBook = async (title_for_search: string) => {
  const query1 = `SELECT * FROM books WHERE title_for_search = ?`;
  const [existBook] = await queryToDatabase(query1, [title_for_search]);

  if (existBook.length !== 0) return true;
  return false;
};

const isExistBookID = async (BookID: string) => {
  const query1 = `SELECT * FROM books WHERE BookID = ?`;
  const [existBook] = await queryToDatabase(query1, [BookID]);

  if (existBook.length !== 0) return true;
  return false;
};

const isExistBookmark = async (title_for_search: string) => {
  const query1 = `SELECT * FROM bookmarks WHERE title_for_search = ?`;
  const [existBookmark] = await queryToDatabase(query1, [title_for_search]);

  if (existBookmark.length !== 0) return true;
  return false;
};

export {
  isExistUsername,
  isExistEmail,
  isExistUserSession,
  isExistBook,
  isExistBookmark,
  isExistBookID,
};

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

export { isExistUsername, isExistEmail, isExistUserSession };

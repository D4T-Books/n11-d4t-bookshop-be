import { queryToDatabase } from "../configs/mysql2.config";

const isTokenInBlackList = async (token: string): Promise<boolean> => {
  const query1 = `SELECT * FROM tokens WHERE token =?`;
  const [tokenInBlackList] = await queryToDatabase(query1, [token]);

  return tokenInBlackList.length !== 0;
};

export { isTokenInBlackList };

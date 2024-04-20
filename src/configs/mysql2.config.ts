import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { InternalServerError } from "../responses/error.response";
import logger from "./logger.config";
dotenv.config();

async function connect(): Promise<mysql.Connection | null> {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "127.0.0.1",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DB_NAME || "d4t-bookshop-db",
    });
  } catch (error) {
    logger.error("Kết nối đến CSDL không thành công!", error);
    throw new InternalServerError("Kết nối đến CSDL không thành công!");
  }
  if (connection) return connection;
  return null;
}

async function queryToDatabase(
  queryString: string,
  args: any[] = []
): Promise<any> {
  const connection = await connect();
  try {
    if (connection) {
      return await connection.query(queryString, args);
    }
  } catch (err) {
    console.log("Query error(queryToDatabase.ts):: ", err);
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

const testConnection = async (): Promise<boolean> => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "127.0.0.1",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DB_NAME || "d4t-bookshop-db",
    });

    if (connection) {
      connection.end();
      return true;
    }
  } catch (error) {
    logger.error("Test Connection Error:: ", error);
    return false;
  }
  return false;
};

export { testConnection, queryToDatabase };

import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

async function connect(): Promise<mysql.Connection | null> {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB_NAME || "d4t-bookshop-db",
  });

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

export { queryToDatabase };

import { queryToDatabase } from "../configs/mysql2.config";

const createSession = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let sessionID = ``;

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionID += characters.charAt(randomIndex);
  }

  const timestamp = Date.now();

  return `${sessionID}-${timestamp}`;
};

const isExpiredSession = async (sessionID: string = ""): Promise<boolean> => {
  const query1 = `SELECT * FROM sessions WHERE sessionID =? ORDER BY id`;
  // console.log("sessionID :>> ", sessionID);
  const [session] = await queryToDatabase(query1, [sessionID]);
  // console.log("session.length :>> ", session.length);
  // console.log("session[0].status :>> ", session[0].status);
  // console.log("session[0].expiredAt :>> ", session[0].expiredAt);
  if (
    session.length > 0 &&
    session[0].status != 0 &&
    session[0].expiredAt > Math.floor(Date.now() / 1000)
  ) {
    return false;
  }
  return true;
};

export { createSession, isExpiredSession };

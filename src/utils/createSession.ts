const createSession = (username: string): string => {
  const CONST_12_HOURS = 12 * 60 * 60 * 1000;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let sessionID = ``;

  for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionID += characters.charAt(randomIndex);
  }

  return `${sessionID}_${username}`;
};
export default createSession;

import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

const hashFunction = async (plaintextPassword: string) => {
  return bcrypt.hashSync(plaintextPassword, SALT_ROUNDS);
};

const compareFunction = async (
  plaintextPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(plaintextPassword, hashedPassword);
};
export { hashFunction, compareFunction };

import { queryToDatabase } from "../../configs/mysql2.config.ts";
import { ConflictRequestError } from "../../responses/error.response.ts";

type RegisterParams = {
  fullname?: string;
  username?: string;
  password?: string;
  email?: string;
  avatarUrl?: string;
};

class AccessService {
  static register = async ({
    fullname,
    username,
    password,
    email,
    avatarUrl,
  }: RegisterParams): Promise<void> => {
    const query1 = `SELECT * FROM users WHERE username = ?`;
    const [oldAccount] = await queryToDatabase(query1, [username]);
    if (oldAccount.length > 0)
      throw new ConflictRequestError("Tài khoản đã tồn tại!");
  };

  static login = async ({}: {}): Promise<void> => {
    // Thêm kiểu dữ liệu và trả về của hàm nếu cần
  };

  static logout = async (): Promise<void> => {
    // Thêm kiểu dữ liệu và trả về của hàm nếu cần
  };
}

export default AccessService;

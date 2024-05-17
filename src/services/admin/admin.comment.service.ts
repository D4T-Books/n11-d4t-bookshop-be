import { queryToDatabase } from "../../configs/mysql2.config.ts";

import {
  AuthFailureError,
  BadRequestError,
} from "../../responses/error.response.ts";
import { pickData } from "../../utils/pick.ts";

class AdminCommentService {
  static getListComments = async () => {
    const query1 = `SELECT * FROM comments WHERE isDeleted = 0`;
    const [comments] = await queryToDatabase(query1, []);

    return {
      comments,
    };
  };
}

export default AdminCommentService;

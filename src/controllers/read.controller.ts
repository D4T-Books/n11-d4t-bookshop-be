import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";
// import { SuccessResponse } from "../responses/success.response.ts";
import { ReadService } from "../services/index.ts";
import { BadRequestError } from "../responses/error.response.ts";
import stringConversion from "../utils/stringConversion.ts";
class ReadController {
  static readEachPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const pagePath = path.resolve(
      __dirname,
      "../",
      "public",
      "books",
      stringConversion(req.body.title),
      `${stringConversion(req.body.title)}-${req.body.page}.png`
    );
    try {
      await fs.access(pagePath);
    } catch (error) {
      console.error(`Lỗi khi kiểm tra tệp: ${error}`);
      throw new BadRequestError("Tệp không tồn tại!");
    }

    return res.sendFile(pagePath);
  };
}

export default ReadController;

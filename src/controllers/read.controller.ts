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
    let formattedPageNum;
    if (req.body.page && req.body.page < 1000) {
      formattedPageNum = req.body.page.toString().padStart(3, "0");
    }
    console.log("formattedPageNum :>> ", formattedPageNum);
    const pagePath = path.resolve(
      __dirname,
      "../",
      "public",
      "books",
      stringConversion(req.body.title),
      `${stringConversion(req.body.title)}-${formattedPageNum}.png`
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

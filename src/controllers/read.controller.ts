import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";
import { ReadService } from "../services/index.ts";
import { BadRequestError } from "../responses/error.response.ts";
import stringConversion from "../utils/stringConversion.ts";
import { AuthenticatedRequest } from "../global/index.ts";
import { SuccessResponse } from "../responses/success.response.ts";
class ReadController {
  static readEachPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("req.query.page :>> ", req.query.page);
    console.log("req.query.title :>> ", req.query.title);
    let formattedPageNum;
    if (req.query.page && Number(req.query.page) < 1000) {
      formattedPageNum = req.query.page.toString().padStart(3, "0");
    }
    console.log("\nformattedPageNum :>> ", formattedPageNum);

    const pagePath = path.resolve(
      __dirname,
      "../",
      "public",
      "books",
      stringConversion(req.query.title),
      `${stringConversion(req.query.title)}-${formattedPageNum}.png`
    );
    try {
      await fs.access(pagePath);
    } catch (error) {
      console.error(`Lỗi khi kiểm tra tệp: ${error}`);
      throw new BadRequestError("Tệp không tồn tại!");
    }

    return res.sendFile(pagePath);
  };

  static trackingBook = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Tracking book success!",
      metadata: await ReadService.trackingBook(req.user, req.body),
    }).send(res);
  };

  static buyBook = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Buy a new book success!",
      metadata: await ReadService.buyBook(req.user, req.body),
    }).send(res);
  };

  static trackingFavoriteBook = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Tracking loved book success!",
      metadata: await ReadService.trackingFavoriteBook(req.user, req.body),
    }).send(res);
  };

  static removeTrackingFavoriteBook = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Remove tracking loved book success!",
      metadata: await ReadService.removeTrackingFavoriteBook(
        req.user,
        req.body
      ),
    }).send(res);
  };

  static getTrackingBookList = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Tracking book success!",
      metadata: await ReadService.getTrackingBookList(req.user),
    }).send(res);
  };
  static getFavoriteTrackedBookList = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Tracking book success!",
      metadata: await ReadService.getFavoriteTrackedBookList(req.user),
    }).send(res);
  };
}

export default ReadController;

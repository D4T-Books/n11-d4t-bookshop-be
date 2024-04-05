import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import BookService from "../services/book/book.service.ts";

class BookController {
  static searchByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search by name success!",
      metadata: await BookService.searchByName(req.body),
    }).send(res);
  };

  static searchByCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search by Categorie success!",
      metadata: await BookService.searchByCategories(req.body),
    }).send(res);
  };

  static searchTop5BookByViews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search top 5 views success!",
      metadata: await BookService.searchTop5BookByViews(),
    }).send(res);
  };
}

export default BookController;

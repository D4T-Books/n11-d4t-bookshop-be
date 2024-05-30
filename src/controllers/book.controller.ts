import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import { BookService } from "../services/index.ts";
import { AuthenticatedRequest } from "../global/index.ts";

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

  static searchByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search by category success!",
      metadata: await BookService.searchByCategory(req.body),
    }).send(res);
  };

  static searchByTagName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search by tag name success!",
      metadata: await BookService.searchByTagName(req.body),
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

  static searchTop6NewBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search top 5 views success!",
      metadata: await BookService.searchTop6NewBooks(),
    }).send(res);
  };

  static searchTop6FreeBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search top 5 views success!",
      metadata: await BookService.searchTop6FreeBooks(),
    }).send(res);
  };

  static getBookmarksByTitle = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get bookmarks success!",
      metadata: await BookService.getBookmarksByTitle(req.user, req.body),
    }).send(res);
  };

  static addBook = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Add a new book success!",
      metadata: await BookService.addBook(req.body),
    }).send(res);
  };

  static toggleShowBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Toggle show book success!",
      metadata: await BookService.toggleShowBook(req.body),
    }).send(res);
  };
  static createBookmark = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Create a bookmarks success!",
      metadata: await BookService.createBookmark(req.body),
    }).send(res);
  };
  static getAllBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get all books success!",
      metadata: await BookService.getAllBook(),
    }).send(res);
  };
  static updateBookView = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Update Book View success!",
      metadata: await BookService.updateBookView(req.body),
    }).send(res);
  };
}

export default BookController;

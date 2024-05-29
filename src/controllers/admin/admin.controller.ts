import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../../responses/success.response.ts";
import AdminUserService from "../../services/admin/admin.user.service.ts";
import AuthenticatedRequest from "./../../global/AuthenticatedRequest";
import AdminCommentService from "./../../services/admin/admin.comment.service";
import AdminBookService from "../../services/admin/admin.book.service.ts";

class AdminController {
  static getListUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get user list success!",
      metadata: await AdminUserService.getListUser(),
    }).send(res);
  };

  static countUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Count user success!",
      metadata: await AdminUserService.countUser(),
    }).send(res);
  };

  static countBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Count book success!",
      metadata: await AdminUserService.countBook(),
    }).send(res);
  };

  static countTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Count transaction success!",
      metadata: await AdminUserService.countTransaction(),
    }).send(res);
  };

  static deleteUserByUsername = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Remove a user success!",
      metadata: await AdminUserService.deleteUserByUsername(req.body),
    }).send(res);
  };

  static searchUser = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search a user success!",
      metadata: await AdminUserService.searchUser(req.body),
    }).send(res);
  };

  static searchComments = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Search a user success!",
      metadata: await AdminUserService.searchComments(req.body),
    }).send(res);
  };

  static getListComments = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get List Comments success!",
      metadata: await AdminCommentService.getListComments(),
    }).send(res);
  };

  static getAllBook = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get List Comments success!",
      metadata: await AdminBookService.getAllBook(),
    }).send(res);
  };

  static deleteCommentByID = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Remove a comment success!",
      metadata: await AdminUserService.deleteCommentByID(req.body),
    }).send(res);
  };

  static updateBook = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Update a book success!",
      metadata: await AdminBookService.updateBook(req.body),
    }).send(res);
  };
}

export default AdminController;

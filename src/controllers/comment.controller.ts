import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import { CommentService } from "../services/index.ts";
import AuthenticatedRequest from "./../global/AuthenticatedRequest";
class CommentController {
  static createComment = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add a new comment success!",
      metadata: await CommentService.createComment(req.user, req.body),
    }).send(res);
  };

  static getComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get list comment success!",
      metadata: await CommentService.getComments(req.body),
    }).send(res);
  };
}

export default CommentController;

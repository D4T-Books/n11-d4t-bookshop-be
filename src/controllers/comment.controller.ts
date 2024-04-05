import { Request, Response, NextFunction } from "express";

import { SuccessResponse } from "../responses/success.response.ts";
import CommentService from "../services/comment/comment.service.ts";

class CommentController {
  static createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add a new comment success!",
      metadata: await CommentService.createComment(req.body),
    }).send(res);
  };

  static getComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add a new comment success!",
      metadata: await CommentService.getComments(req.body),
    }).send(res);
  };
}

export default CommentController;

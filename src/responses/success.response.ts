import { Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode.ts";
import ReasonPhrase from "../utils/ReasonPhrase.ts";

type SR = {
  message: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata?: any;
};

type CR = {
  message: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata?: any;
  options?: any;
};

class SuccessResponse {
  message: string;
  status: number;
  metadata: any;

  constructor({
    message,
    statusCode = HttpStatusCode.OK,
    reasonStatusCode = ReasonPhrase.OK,
    metadata = {},
  }: SR) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, header: any = {}) {
    res.set(header);
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: { message: string; metadata?: any }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  options: any;

  constructor({
    message,
    statusCode = HttpStatusCode.CREATED,
    reasonStatusCode = ReasonPhrase.CREATED,
    metadata,
    options = {},
  }: CR) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

export { OK, CREATED, SuccessResponse };

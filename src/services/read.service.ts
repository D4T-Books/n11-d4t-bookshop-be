import { queryToDatabase } from "../configs/mysql2.config.ts";
import fs from "fs";
import path from "path";
import {
  AuthFailureError,
  BadRequestError,
} from "../responses/error.response.ts";
import { pickData } from "../utils/pick.ts";

type readParams = {
  title: string;
  page: string;
};

class ReadService {}

export default ReadService;

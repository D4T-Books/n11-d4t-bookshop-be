import express, { NextFunction, Request, Response } from "express";
import asyncHandle from "../../helpers/asyncHandle.ts";
import AdminController from "../../controllers/admin/admin.controller.ts";
import { accessMiddleware } from "../../middlewares/access.middleware.ts";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware.ts";

const router = express.Router();

router.get(
  "/admin/test/ok",
  (req: Request, res: Response, next: NextFunction): any => {
    return res.status(200).json("ok");
  }
);

router.get(
  "/admin/users",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.getListUser)
);

router.get(
  "/admin/users/count",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.countUser)
);

router.get(
  "/admin/books/count",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.countBook)
);

router.get(
  "/admin/transactions/count",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.countTransaction)
);

router.post(
  "/admin/user/remove",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.deleteUserByUsername)
);

router.post(
  "/admin/user/search",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.searchUser)
);

router.get(
  "/admin/comment/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.getListComments)
);

router.post(
  "/admin/comment/remove",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.deleteCommentByID)
);

router.post(
  "/admin/comment/search",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.searchComments)
);

router.get(
  "/admin/book/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.getAllBook)
);

router.post(
  "/admin/book/update",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.updateBook)
);

router.get(
  "/admin/vouchers/list",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.getVoucherList)
);

router.post(
  "/admin/voucher/create",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.createVoucher)
);

router.post(
  "/admin/voucher/update",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.updateVoucher)
);

router.post(
  "/admin/voucher/delete",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.deleteVoucher)
);

router.post(
  "/admin/voucher/search",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.searchVoucher)
);

router.post(
  "/admin/voucher/search/id",
  asyncHandle(accessMiddleware),
  authorizationMiddleware(["A"]),
  asyncHandle(AdminController.searchVoucherByID)
);

export default router;

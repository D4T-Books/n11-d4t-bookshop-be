import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} from "../../responses/error.response.ts";
import payOSClient from "../../utils/payos.ts";
import axios from "axios";

class OrderService {
  static createOrder = async ({
    description,
    returnUrl,
    cancelUrl,
    amount,
    items,
  }: {
    description: any;
    returnUrl: any;
    cancelUrl: any;
    amount: any;
    items: any;
  }): Promise<any> => {
    const body = {
      orderCode: Number(String(new Date().getTime()).slice(-6)),
      amount,
      description,
      cancelUrl,
      returnUrl,
      items,
    };

    try {
      const paymentLinkRes = await payOSClient.createPaymentLink(body);

      return {
        error: 0,
        message: "Success",
        data: {
          bin: paymentLinkRes.bin,
          checkoutUrl: paymentLinkRes.checkoutUrl,
          accountNumber: paymentLinkRes.accountNumber,
          accountName: paymentLinkRes.accountName,
          amount: paymentLinkRes.amount,
          description: paymentLinkRes.description,
          orderCode: paymentLinkRes.orderCode,
          qrCode: paymentLinkRes.qrCode,
        },
      };
    } catch (error) {
      console.log("Lỗi trong hàm tạo order service::\n", error);
      return {
        error: -1,
        message: "fail",
        data: null,
      };
    }
  };

  static getByOrderId = async (
    orderId: any,
    {
      Username,
      numberOfCoins,
    }: {
      Username: any;
      numberOfCoins: any;
    }
  ): Promise<any> => {
    try {
      const order = await payOSClient.getPaymentLinkInformation(orderId);
      if (!order) {
        return {
          error: -1,
          message: "failed",
          data: null,
        };
      }
      //console.log("order :>> ", order.transactions[0]?.transactionDateTime); //2024-06-02T00:50:14+07:00

      // CREATE TRANSACTION
      if (order?.status === "PAID") {
        const response = await axios.post(
          "http://localhost:3000/v1/api/transaction/add-coins-by-order",
          {
            Username,
            numberOfCoins,
          }
        );

        return {
          error: 0,
          message: "ok",
          data: order,
          metadata: response.data.metadata,
        };
      }

      return {
        error: 0,
        message: "ok",
        data: order,
      };
    } catch (error) {
      console.log(error);
      return {
        error: -1,
        message: "failed",
        data: null,
      };
    }
  };

  static cancelOrder = async (
    orderId: any,
    { cancellationReason }: { cancellationReason: any }
  ): Promise<any> => {
    try {
      const order = await payOSClient.cancelPaymentLink(
        orderId,
        cancellationReason
      );
      if (!order) {
        return {
          error: -1,
          message: "failed",
          data: null,
        };
      }
      return {
        error: 0,
        message: "ok",
        data: order,
      };
    } catch (error) {
      console.log(error);
      return {
        error: -1,
        message: "failed",
        data: null,
      };
    }
  };

  static confirmWebhook = async ({ webhookUrl }: { webhookUrl: any }) => {
    try {
      await payOSClient.confirmWebhook(webhookUrl);
      return {
        error: 0,
        message: "ok",
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        error: -1,
        message: "failed",
        data: null,
      };
    }
  };
}

export default OrderService;

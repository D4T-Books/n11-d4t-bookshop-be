const swaggerDefinition: any = {
  swagger: "2.0",
  info: {
    description: "This is an API document for D4T project.",
    version: "1.0.6",
    title: "Swagger D4T",
    contact: {
      name: "DDung203",
      url: "https://github.com/Ddung203/",
    },
  },
  host: "localhost:3000",
  basePath: "/v1/api/",
  tags: [
    {
      name: "ping",
      description: "Kiểm tra sever có hoạt động không",
    },
    {
      name: "access",
      description: "Đăng ký, đăng nhập",
    },
  ],
  schemes: ["http"],
  paths: {
    "/ping": {
      get: {
        tags: ["ping"],
        summary: "",
        description: "",
        operationId: "pingOperation",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "object",
              properties: {
                status: { type: "string", example: "success" },
                message: { type: "string", example: "pong" },
              },
            },
          },

          404: {
            description: "Account does not exist!",
            schema: {
              type: "object",
              properties: {
                status: { type: "string", example: "error" },
                code: { type: "number", example: 404 },
                message: { type: "string", example: "Not Found" },
              },
            },
          },
        },
      },
    },
    "/access/register": {
      post: {
        tags: ["access"],
        summary: "",
        description: "",
        operationId: "registerOperation",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,

            schema: {
              properties: {
                email: {
                  type: "string",
                  example: "cuoicuoi1000@gmail.com",
                },
                fullName: {
                  type: "string",
                  example: "Dương Văn Dũng",
                },
                password: {
                  type: "string",
                  example: "Abc123@",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Register success" },
                status: { type: "string", example: "success" },
                code: { type: "number", example: 200 },
                metadata: {
                  type: "object",
                  example: {
                    user: {
                      UserID: 14,
                      Username: "cuoicuoi1000",
                      Email: "cuoicuoi@gmail.com",
                      Address: null,
                      coins: 0,
                    },
                  },
                },
              },
            },
          },

          404: {
            description: "Error!",
            schema: {
              type: "object",
              properties: {
                status: { type: "string", example: "error" },
                code: { type: "number" },
                message: { type: "string" },
              },
            },
          },
        },
      },
    },
    "/access/login": {
      post: {
        tags: ["access"],
        summary: "Đăng nhập vào hệ thống",
        description: "Sử dụng để đăng nhập vào hệ thống.",
        operationId: "loginOperation",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Thông tin tài khoản người dùng",
            required: true,
            schema: {
              properties: {
                username: {
                  type: "string",
                  example: "user5",
                },
                password: {
                  type: "string",
                  example: "password5",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Đăng nhập thành công",
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Login success!" },
                status: { type: "number", example: 200 },
                metadata: {
                  type: "object",
                  example: {
                    user: {
                      UserID: 5,
                      Username: "user5",
                      Email: "user5@example.com",
                      Address: "1213 UVW Street",
                      coins: 350,
                    },
                    tokens: {
                      accessToken:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InVzZXI1IiwiRW1haWwiOiJ1c2VyNUBleGFtcGxlLmNvbSIsIlJvbGVzIjoiVSIsImlzRGVsZXRlZCI6MCwiaWF0IjoxNzEzMjg2NjY3LCJleHAiOjE3MTM0NTk0Njd9.KZlZKTIunHPNqIff3yem64XABz0DHyMBkWUW2sHixBo",
                      refreshToken:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InVzZXI1IiwiRW1haWwiOiJ1c2VyNUBleGFtcGxlLmNvbSIsIlJvbGVzIjoiVSIsImlzRGVsZXRlZCI6MCwiaWF0IjoxNzEzMjg2NjY3LCJleHAiOjE3MTQ1ODI2Njd9.njUDuMjMTHMcvq2Y7ZyFNO8M2wt0yGs3eFPmNGF2h4I",
                    },
                  },
                },
              },
            },
          },

          401: {
            description: "Unauthorized",
            schema: {
              type: "object",
              properties: {
                status: { type: "string", example: "error" },
                code: { type: "number", example: 401 },
                message: { type: "string", example: "Unauthorized" },
              },
            },
          },
        },
      },
    },
  },
  securityDefinitions: {},
  definitions: {},
  externalDocs: {
    description: "Find out more about Swagger",
    url: "http://swagger.io",
  },
};

export default swaggerDefinition;

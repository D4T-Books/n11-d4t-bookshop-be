import swaggerJSDoc from "swagger-jsdoc";
import swaggerDefinition from "./swaggerDefinition.ts";

const swaggerOptions = {
  swaggerDefinition,
  apis: ["../routers/index.ts"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;

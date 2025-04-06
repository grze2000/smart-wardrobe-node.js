import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { configurePassport } from "./config/passport.js";
import { authenticate } from "./config/authenticate.js";
import authRoutes from "./routes/authRoutes.js";
import enumsRoutes from "./routes/enumRoutes.js";
import clothesRoutes from "./routes/clothesRoutes.js";
import deviceTokensRoutes from "./routes/deviceTokensRoutes.js";
import { configureSocketIO } from "./socket.io/socketIO.js";
import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();

configurePassport();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: true,
  },
});

configureSocketIO(io);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log(`[${new Date().toLocaleString()}] Connected to database`);
  })
  .catch((err: Error) => {
    console.log(
      `[${new Date().toLocaleString()}] Database connection error: ${err}`
    );
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Smart wardrobe API",
      version: "2.0.0",
    },
    basePath: "/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["app.ts", "routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/auth", authRoutes);
app.use("/enums", enumsRoutes);
app.use("/clothes", authenticate, clothesRoutes);
app.use("/device-tokens", authenticate, deviceTokensRoutes);
app.use("/weather-log", weatherRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[${new Date().toLocaleString()}] Listening on ${PORT}`);
});

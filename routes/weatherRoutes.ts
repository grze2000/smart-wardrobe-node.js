import { Router } from "express";
import { checkSchema } from "express-validator";
import { weatherLogSchema } from "../schemas/weatherLogSchema";
import {
  addWeatherLog,
  getWeatherLogs,
} from "../controllers/weatherController";

const weatherRoutes = Router();

/**
 * @swagger
 * /weather-log:
 *   get:
 *     tags: [WeatherLog]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numer strony (domyślnie 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Liczba logów na stronę (domyślnie 10)
 *     responses:
 *       200:
 *         description: Lista logów pogodowych z paginacją
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalLogs:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       externalData:
 *                         type: object
 *                         properties:
 *                           temperature:
 *                             type: number
 *                             format: float
 *                       internalData:
 *                         type: object
 *                         properties:
 *                           temperature:
 *                             type: number
 *                             format: float
 *                           humidity:
 *                             type: number
 *                             format: float
 *                       location:
 *                         type: object
 *                         properties:
 *                           lat:
 *                             type: number
 *                             format: float
 *                           lng:
 *                             type: number
 *                             format: float
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
weatherRoutes.get("/", getWeatherLogs);

/**
 * @swagger
 * /weather-log:
 *   post:
 *     tags: [WeatherLog]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: weatherLog
 *         schema:
 *           type: object
 *           required:
 *             - externalData
 *             - internalData
 *             - location
 *           properties:
 *             externalData:
 *               type: object
 *               properties:
 *                 temperature:
 *                   type: number
 *                   format: float
 *             internalData:
 *               type: object
 *               properties:
 *                 temperature:
 *                   type: number
 *                   format: float
 *                 humidity:
 *                   type: number
 *                   format: float
 *             location:
 *               type: object
 *               properties:
 *                 lat:
 *                   type: number
 *                   format: float
 *                 lng:
 *                   type: number
 *                   format: float
 *     responses:
 *       201:
 *         description: Log pogodowy został utworzony
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 externalData:
 *                   type: object
 *                   properties:
 *                     temperature:
 *                       type: number
 *                       format: float
 *                 internalData:
 *                   type: object
 *                   properties:
 *                     temperature:
 *                       type: number
 *                       format: float
 *                     humidity:
 *                       type: number
 *                       format: float
 *                 location:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                       format: float
 *                     lng:
 *                       type: number
 *                       format: float
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
weatherRoutes.post("/", checkSchema(weatherLogSchema), addWeatherLog);

export default weatherRoutes;

import { Router } from "express";
import {
  createDeviceToken,
  deleteDeviceToken,
  getDeviceTokens,
} from "../controllers/deviceTokensController.js";
import { deviceTokenSchema } from "../schemas/deviceTokenSchema.js";
import { checkSchema } from "express-validator";

const deviceTokensRoutes = Router();

/**
 * @swagger
 * /device-tokens:
 *  get:
 *    tags: [Device tokens]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  'name':
 *                    type: string
 *                  token:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 */
deviceTokensRoutes.get("/", getDeviceTokens);

/**
 * @swagger
 * /device-tokens:
 *  post:
 *    tags: [Device tokens]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                'name':
 *                  type: string
 *                token:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 */
deviceTokensRoutes.post("/", checkSchema(deviceTokenSchema), createDeviceToken);

/**
 * @swagger
 * /device-tokens/{deviceTokenId}:
 *  delete:
 *    tags: [Device tokens]
 *    parameters:
 *      - in: path
 *        name: deviceTokenId
 *    responses:
 *      200:
 *        description: Success
 */
deviceTokensRoutes.delete("/:id", deleteDeviceToken);

export default deviceTokensRoutes;

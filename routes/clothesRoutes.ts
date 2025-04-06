import { Router } from "express";
import { checkSchema } from "express-validator";
import { clothesSchema } from "../schemas/clothesSchema";
import { addClothes, getClothes } from "../controllers/clothesController";

const clothesRoutes = Router();

/**
 * @swagger
 * /clothes:
 *  get:
 *    tags: [Clothes]
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
 *                  description:
 *                    type: string
 *                  'type':
 *                    type: string
 *                  materialThickness:
 *                    type: string
 *                  colors:
 *                    type: array
 *                    items:
 *                      type: string
 *                  status:
 *                    type: string
 *                  purchaseDate:
 *                    type: string
 *                    format: date-time
 *                  value:
 *                    type: number
 *                    format: float
 *                  tagId:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 */
clothesRoutes.get("/", getClothes);

/**
 * @swagger
 * /clothes:
 *  post:
 *    tags: [Clothes]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            'name':
 *              type: string
 *            description:
 *              type: string
 *            'type':
 *              type: string
 *            materialThickness:
 *              type: string
 *            colors:
 *              type: array
 *              items:
 *                type: string
 *            status:
 *              type: string
 *            purchaseDate:
 *              type: string
 *            value:
 *              type: number
 *              format: float
 *            tagId:
 *              type: string
 */
clothesRoutes.post("/", checkSchema(clothesSchema), addClothes);

export default clothesRoutes;

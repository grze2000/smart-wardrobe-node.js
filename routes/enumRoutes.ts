import { Router } from "express";
import {
  getClothesStatuses,
  getClothesTypes,
  getColors,
  getMaterialThickness,
} from "../controllers/enumController.js";

const enumsRoutes = Router();

/**
 * @swagger
 * /enums/colors:
 *  get:
 *    tags: [Enums]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 */
enumsRoutes.get("/colors", getColors);

/**
 * @swagger
 * /enums/material-thickness:
 *  get:
 *    tags: [Enums]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 */
enumsRoutes.get("/material-thickness", getMaterialThickness);

/**
 * @swagger
 * /enums/clothes-types:
 *  get:
 *    tags: [Enums]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 */
enumsRoutes.get("/clothes-types", getClothesTypes);

/**
 * @swagger
 * /enums/clothes-statuses:
 *  get:
 *    tags: [Enums]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 */
enumsRoutes.get("/clothes-statuses", getClothesStatuses);

export default enumsRoutes;

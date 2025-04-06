import { Router } from "express";
import { checkSchema } from "express-validator";
import { loginSchema } from "../schemas/loginSchema";
import { registerSchema } from "../schemas/registerSchema";
import { tokenSchema } from "../schemas/tokenSchema";
import {
  login,
  refreshToken,
  register,
  revokeToken,
} from "../controllers/authController";

const authRoutes = Router();

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: [Auth]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *              format: password
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *                userId:
 *                  type: string
 *                email:
 *                  type: string
 *
 */
authRoutes.post("/login", checkSchema(loginSchema), login);

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags: [Auth]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *              format: password
 *            confirmPassword:
 *              type: string
 *              format: password
 *    responses:
 *      201:
 *        description: Account has been created
 */
authRoutes.post("/register", checkSchema(registerSchema), register);

/**
 * @swagger
 * /auth/refresh-token:
 *  post:
 *    tags: [Auth]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 */
authRoutes.post("/refresh-token", checkSchema(tokenSchema), refreshToken);

/**
 * @swagger
 * /auth/revoke-token:
 *  post:
 *    tags: [Auth]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Invalid token
 */
authRoutes.post("/revoke-token", checkSchema(tokenSchema), revokeToken);

export default authRoutes;

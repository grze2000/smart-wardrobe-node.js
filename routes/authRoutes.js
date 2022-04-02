const router = require('express').Router();
const { checkSchema } = require('express-validator');
const loginSchema = require('../schemas/loginSchema');
const authController = require('../controllers/authController');
const registerSchema = require('../schemas/registerSchema');
const tokenSchema = require('../schemas/tokenSchema');

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
 *    responses:
 *      200:
 *        schema:
 *          type: object
 *          properties:
 *            accessToken:
 *              type: string
 *            refreshToken:
 *              type: string
 *            userId:
 *              type: string
 *            email:
 *              type: string
 *  
 */
router.post('/login', checkSchema(loginSchema), authController.login);

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
 *            confirmPassword:
 *              type: string
 *    responses:
 *      201:
 *        description: Account has been created  
 */
router.post('/register', checkSchema(registerSchema), authController.register);

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
 *        schema:
 *          type: object
 *          properties:
 *            accessToken:
 *              type: string
 *            refreshToken:
 *              type: string
 */
router.post('/refresh-token', checkSchema(tokenSchema), authController.refreshToken);

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
router.post('/revoke-token', checkSchema(tokenSchema), authController.revokeToken);

module.exports = router;
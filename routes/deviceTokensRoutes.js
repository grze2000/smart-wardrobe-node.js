const router = require('express').Router();
const { checkSchema } = require('express-validator');
const deviceTokensController = require('../controllers/deviceTokensController');
const deviceTokenSchema = require('../schemas/deviceTokenSchema');

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
router.get('/', deviceTokensController.getDeviceTokens);

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
router.post('/', checkSchema(deviceTokenSchema), deviceTokensController.createDeviceToken);


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
router.delete('/:id', deviceTokensController.deleteDeviceToken);

module.exports = router;
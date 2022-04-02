const router = require('express').Router();
const { checkSchema } = require('express-validator');
const clothesController = require('../controllers/clothesController');
const clothesSchema = require('../schemas/clothesSchema');

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
 *              type: object
 *              properties:
 *                'name':
 *                  type: string
 *                description:
 *                  type: string
 *                'type':
 *                  type: string
 *                materialThickness:
 *                  type: string
 *                colors:
 *                  type: array
 *                  items:
 *                    type: string
 *                inWash:
 *                  type: boolean
 *                inWardrobe:
 *                  type: boolean
 *                purchaseDate:
 *                  type: string
 *                  format: date-time
 *                value:
 *                  type: number
 *                  format: float
 *                tagId:
 *                  type: string
 */
router.get('/', clothesController.getClothes);

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
 *            inWash:
 *              type: boolean
 *            inWardrobe:
 *              type: boolean
 *            purchaseDate:
 *              type: string
 *            value:
 *              type: number
 *              format: float
 *            tagId:
 *              type: string
 */
router.post('/', checkSchema(clothesSchema), clothesController.addClothes);

module.exports = router;
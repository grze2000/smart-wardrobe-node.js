const router = require('express').Router();
const enumController = require('../controllers/enumController');

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
router.get('/colors', enumController.getColors);

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
router.get('/material-thickness', enumController.getMaterialThickness);

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
router.get('/clothes-types', enumController.getClothesTypes);

module.exports = router;
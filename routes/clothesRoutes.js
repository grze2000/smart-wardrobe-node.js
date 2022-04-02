const router = require('express').Router();
const clothesController = require('../controllers/clothesController');

router.get('/', clothesController.getClothes);

module.exports = router;
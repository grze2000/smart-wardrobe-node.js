const router = require('express').Router();
const { checkSchema } = require('express-validator');
const loginSchema = require('../schemas/loginSchema');
const authController = require('../controllers/authController');
const registerSchema = require('../schemas/registerSchema');
const tokenSchema = require('../schemas/tokenSchema');

router.post('/login', checkSchema(loginSchema), authController.login);
router.post('/register', checkSchema(registerSchema), authController.register);
router.post('/refresh-token', checkSchema(tokenSchema), authController.refreshToken);
router.post('/revoke-token', checkSchema(tokenSchema), authController.revokeToken);

module.exports = router;
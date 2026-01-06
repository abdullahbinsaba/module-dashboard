const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema, refreshTokenSchema } = require('../validators/schemas');

// Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshTokenSchema), authController.refresh);

// Protected route
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;


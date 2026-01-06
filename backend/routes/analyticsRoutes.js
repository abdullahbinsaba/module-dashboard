const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

// Protected route
router.get('/overview', authenticateToken, authorizeRoles('admin'), analyticsController.getOverview);

module.exports = router;


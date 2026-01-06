const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema } = require('../validators/schemas');

// All task routes require authentication
router.use(authenticateToken);

router.get('/', authorizeRoles('user', 'admin'), taskController.getTasks);
router.post('/', authorizeRoles('user', 'admin'), validate(createTaskSchema), taskController.createTask);
router.put('/:id', authorizeRoles('user', 'admin'), validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', authorizeRoles('user', 'admin'), taskController.deleteTask);

module.exports = router;


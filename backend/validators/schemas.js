const Joi = require('joi');

// Auth Schemas
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().min(5).max(191).required(), // Max 191 for MySQL unique index
  password: Joi.string().min(6).max(255).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(5).max(191).required(),
  password: Joi.string().min(6).max(255).required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

// Task Schemas
const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional().allow(''),
  status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().max(1000).optional().allow(''),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  createTaskSchema,
  updateTaskSchema,
};


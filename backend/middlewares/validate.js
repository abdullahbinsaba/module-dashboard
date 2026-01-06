const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ error: 'Validation Error', details: errors });
  }
  next();
};

module.exports = validate;


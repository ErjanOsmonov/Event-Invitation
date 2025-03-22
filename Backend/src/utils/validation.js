const Joi = require('joi');

const guestSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required()
});

const wishSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  text: Joi.string().min(1).max(500).required()
});

const validateGuest = (data) => {
  return guestSchema.validate(data, { abortEarly: false });
};

const validateWish = (data) => {
  return wishSchema.validate(data, { abortEarly: false });
};

module.exports = { validateGuest, validateWish };
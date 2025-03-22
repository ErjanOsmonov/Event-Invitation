const Joi = require('joi');

const validateGuest = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().min(10).required()
  });
  return schema.validate(data);
};

const validateWish = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    text: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = { validateGuest, validateWish };
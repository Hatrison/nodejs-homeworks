const Joi = require("joi");

const contactSchemaForAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactSchemaForPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

module.exports = { contactSchemaForAdd, contactSchemaForPut };

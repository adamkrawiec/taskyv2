const Joi = require('joi');
const { 
  HIDDEN,
  SELECTED,
  ALL
} = require('./constants');

const ItemSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string(),
  url: Joi.string().uri(),
  addedById: Joi.number(),
  visibility: Joi.string().required().valid(HIDDEN, SELECTED, ALL)
}).options({ abortEarly: false });

module.exports = ItemSchema; 
const Joi = require('joi')

const TaskSchema = Joi.object({
  userId: Joi.number().required(),
  itemId: Joi.number().required(),
  deadlineAt: Joi.date().greater(new Date()).required()
})

module.exports = TaskSchema;

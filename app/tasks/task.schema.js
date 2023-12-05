const Joi = require('joi')

const TaskSchema = Joi.object({
  userId: Joi.number(),
  itemId: Joi.number(),
  deadlineAt: Joi.date().greater(new Date())
})

module.exports = TaskSchema;

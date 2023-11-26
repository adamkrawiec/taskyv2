const { Op } = require('sequelize');

const Task = require('./task.model');

const findTask = async(id) => await Task.findByPk(id);

const findTasks = async (req, { includes = [] } = {}) => {
  const perPage = 20;
  const offset = req.query.page ? (req.query.page - 1) * perPage : 0;
  let conditions = {};

  if(req.query.completed) conditions['completedAt'] = { [Op.not]: null };
  if(req.query.user_id) conditions['userId'] = parseInt(req.query.user_id);
  if(req.query.item_id) conditions['itemId'] = parseInt(req.query.item_id);

  let deadlineConditions = {};
  if(req.query.deadline_before) deadlineConditions[Op.lte] = req.query.deadline_before;
  if(req.query.deadline_after) deadlineConditions[Op.gte] = req.query.deadline_after;

  if(req.query.deadline_before || req.query.deadline_after) {
    conditions['deadlineAt'] = deadlineConditions;
  }

  return await Task.findAll({
    where: conditions,
    include: includes,
    limit: perPage,
    offset,
  });
};



module.exports = { findTask, findTasks };

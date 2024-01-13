const { Op } = require('sequelize');

const Task = require('./task.model');


const buildConditions = (query) => {
  let conditions = {};

  if(query.completed) conditions['completedAt'] = { [Op.not]: null };
  if(query.user_id) conditions['userId'] = parseInt(query.user_id);
  if(query.item_id) conditions['itemId'] = parseInt(query.item_id);

  let deadlineConditions = {};
  if(query.deadline_before) deadlineConditions[Op.lte] = query.deadline_before;
  if(query.deadline_after) deadlineConditions[Op.gte] = query.deadline_after;

  if(query.deadline_before || query.deadline_after) {
    conditions['deadlineAt'] = deadlineConditions;
  }
  return conditions;
};

const findTask = async(id) => await Task.findByPk(id);

const findTasks = async ({ query } = {}, { includes = [], attributes } = {}) => {
  const perPage = query.perPage ? query.perPage : null;
  const offset = query.page ? (query.page - 1) * perPage : 0;

  return await Task.findAll({
    where: buildConditions(query),
    include: includes,
    limit: perPage,
    attributes: attributes,
    offset,
  });
};

const countTasks = async({ query = {}, attributes, group } = {}) => {
  return await Task.count({
    where: buildConditions(query),
    attributes,
    group
  });
};



module.exports = { findTask, findTasks, countTasks };

const { Op } = require("sequelize");

const Task = require("./task.model");
const User = require("#app/users/user.model");

const findTask = async(id) => await Task.findByPk(id);

const findTasks = async (req) => {
  const perPage = 20;
  offset = req.query.page ? (req.query.page - 1) * perPage : 1;
  let conditions = {};

  if(req.query.completed) conditions['completedAt'] = { [Op.not]: null }
  if(req.query.title) conditions['title'] = { [Op.substring]: req.query.title }
  if(req.query.user_id) conditions['userId'] = req.query.user_id

  return await Task.findAll({
    where: conditions,
    include: User,
    limit: perPage,
    offset,
  })
};

module.exports = { findTask, findTasks };

const { Op } = require("sequelize");

const Task = require("./task.model");
const User = require("../users/user.model");

// const tasksByUserId = async (userId) =>
//   await Task.findAll({ where: { userId } })
//
// const tasksByStatus = async (status) =>
//   await Task.findAll({ where: { status } })
//
// const TasksCompleted = async() =>
//   await Task.findAll({ where: { completedAt: { [Op.not]: null } } });
//
// const TasksByTitleIlike = async(title) =>
//   await Task.findAll({ where: { title: { [Op.substring]: title } } });
//

const findTask = async(id) => await Task.findByPk(id);

const findTasks = async (req) => {
  let conditions = {}

  if(req.query.completed) conditions['completedAt'] = { [Op.not]: null }
  if(req.query.title) conditions['title'] = { [Op.substring]: req.query.title }
  if(req.query.user_id) conditions['userId'] = req.query.user_id

  return await Task.findAll({ where: conditions })
};

module.exports = { findTask, findTasks };

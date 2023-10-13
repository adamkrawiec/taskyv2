const User = require("#app/users/user.model");
const Task = require("#app/tasks/task.model");
const { Op } = require("sequelize");
const { sequelize } = require("#db");

// select users.*, count(tasks.*) as tasks_count
// from users inner join tasks on users.id = "tasks"."userId"
// where "tasks"."completedAt" is not null
// group by users.id
// order by tasks_count desc;
// TODO: is it possible to query with reference to tasks, but not eager load them
const getUsersByMostCompletedTasks = async() => {
  const users = await User.findAll({
    attributes: {
      include: [[sequelize.literal(`count(tasks.*)`),
                 'tasks_count']]
    },
    include: {
      model: Task,
      where: {
        completedAt: { [Op.not]: null }
      },
    },
    group: ["tasks.id", "user.id"],
    order: [['tasks_count', 'DESC']]
  })

  return users;
}

module.exports = {
  getUsersByMostCompletedTasks,
}

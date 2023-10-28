const { getUsersByMostCompletedTasks } = require('./leaderboard.service');
const { USERS_ROOT_PATH } = require('../users.paths');
const { TASKS_ROOT_PATH } = require('#app/tasks/tasks.paths');

const getLeaderboard = async (req, res) => {
  const users = await getUsersByMostCompletedTasks();

  const links = {
    'tasks-log': TASKS_ROOT_PATH,
    'users-log': USERS_ROOT_PATH
  };
  res.json({ links, data: users });
};

module.exports = {
  getLeaderboard,
};

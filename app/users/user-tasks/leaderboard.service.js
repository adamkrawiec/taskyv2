const { sequelize } = require('#db');

const User = require('#app/users/user.model');
const UserLeaderboardDTO = require('./user-leaderboard.dto');

const countCompletedTasksSql = `
  (SELECT COUNT (*)
  FROM "tasks"
  WHERE "tasks"."userId" = "user"."id" AND "tasks"."completedAt" is not null)`;

const getUsersByMostCompletedTasks = async({ currentUser = null} = {}) => {
  const users = await User.findAll({
    attributes: { include: [[sequelize.literal(countCompletedTasksSql),
      'completed_tasks_count']] },
    order: [['completed_tasks_count', 'DESC']],
    limit: 10
  });

  return users.map((user) => UserLeaderboardDTO(user, currentUser));
};

module.exports = {
  getUsersByMostCompletedTasks,
};

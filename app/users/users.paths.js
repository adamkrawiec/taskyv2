const USERS_ROOT_PATH = '/users';
const USER_PATH = '/:id';
const LEADERBOARD_PATH = '/leaderboard';


const userPath = (user) => `${USERS_ROOT_PATH}/${user.id}`;

module.exports = {
  USERS_ROOT_PATH,
  USER_PATH,
  LEADERBOARD_PATH,
  userPath
};

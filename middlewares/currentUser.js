const User = require('#app/users/user.model');

const setCurrentUser = async function (req, res, next) {
  const user_id = req.cookies.session_id;

  const user = await User.findByPk(user_id);
  req.currentUser = user;

  next();
};

module.exports = {
  setCurrentUser,
};

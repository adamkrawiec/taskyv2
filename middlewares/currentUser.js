const User = require('#app/users/user.model');

const setCurrentUser = async function (req, res, next) {
  console.log("Cookies: ", req.cookies);
  const { user_id } = req.cookies;

  const user = await User.findByPk(user_id);
  req.currentUser = user;

  next();
};

module.exports = {
  setCurrentUser,
};

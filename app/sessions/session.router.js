const express = require('express');
const User = require('#app/users/user.model');

const router = express.Router();

const createSession = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if(user) {
    res.cookie('session_id', user.id);
    return res.json({ user });
  }
  res.status(404).json( { error: 'User with provided email not found' });
};

const destroySession = async (req, res) => {
  res.clearCookie('session_id');
  res.end();
};

router.route('/')
  .post(createSession)
  .delete(destroySession);

module.exports = router;

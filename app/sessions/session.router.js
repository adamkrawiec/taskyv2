const express = require('express');
const User = require('#app/users/user.model');

const router = express.Router();

router.route('/').post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email});
  res.cookie('session_id', user.id);
  res.status(204).send('ok');
});

module.exports = router;
